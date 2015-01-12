import os
import jwt, json
from eve import Eve
from flask import Flask, make_response, g, request, jsonify, Response
from eve.auth import TokenAuth
from datetime import datetime, timedelta
from functools import wraps
from settings import TOKEN_SECRET
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from bson import json_util
from framework.match_me_algorithm import *
import requests

class TokenAuth(TokenAuth):
	def check_auth(self, token, allowed_roles, resource, method):
		accounts = app.data.driver.db['people']
		return accounts.find_one({'token': token})


app = Eve(__name__,static_url_path='/static')


def create_token(user):
    payload = {
        'sub': str(user['_id']),
        'iat': datetime.now(),
        'exp': datetime.now() + timedelta(days=14)
    }

    token = jwt.encode(payload, TOKEN_SECRET)
    return token.decode('unicode_escape')


def parse_token(req):
    token = req.headers.get('Authorization').split()[1]
    return jwt.decode(token, TOKEN_SECRET)


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        print '---------------'
        if not request.headers.get('Authorization'):
            response = jsonify(error='Missing authorization header')
            response.status_code = 401
            return response

        payload = parse_token(request)

        if datetime.fromtimestamp(payload['exp']) < datetime.now():
            response = jsonify(error='Token has expired')
            response.status_code = 401
            return response

        g.user_id = payload['sub']

        return f(*args, **kwargs)

    return decorated_function

# Routes

@app.route('/')
def index():
	return make_response(open('static/app/index.html').read())


@app.route('/api/me')
@login_required
def me():
	return Response(json.dumps(g.user_id),  mimetype='application/json')

@app.route('/foo/<path:filename>')
def send_foo(filename):
    return send_from_directory('/static/', filename)

@app.route('/auth/login', methods=['POST'])
def login():
    accounts = app.data.driver.db['people']
    user = accounts.find_one({'email': request.json['email']})
    if not user or not check_password_hash(user['password'], request.json['password']):
        response = jsonify(error='Wrong Email or Password')
        response.status_code = 401
        return response
    #return json.dumps(user,default=json_util.default)
    token = create_token(user)
    return jsonify(token=token)

@app.route('/getsearch')
def getSearchResults():
    extract_words = []
    extract_words = create_tokens(request.args.get("searchtext"))
    print len(extract_words)
    if len(extract_words) == 2:
        data = 'http://127.0.0.1:8000/api/posts?where={"keywords":{"$in":'+json.dumps(list(extract_words))+'}}'
        r = requests.get(data)
        return r.data
    else:
        return "none"

@app.route('/similarwords')
def getSimilarWords():
    words = parse_sentence(request.args.get("new_post"))
    print words
    return json.dumps(list(words))

@app.route('/auth/signup', methods=['POST'])
def signup():
		accounts = app.data.driver.db['people']
		user = {
				'email' :request.json['email'],
				'password' :generate_password_hash(request.json['password'])
		}
		accounts.insert(user)
		token = create_token(user)
		return jsonify(token=token)

#if __name__ == '__main__':
app.run(host='127.0.0.1', port=8000, debug=True)
