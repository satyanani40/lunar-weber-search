import json, requests, urllib2, random
from werkzeug.security import generate_password_hash
from loremipsum import generate_paragraph

print '---------------------------------fetching users-----------------------'
url = 'http://localhost:8000/api/people'
randomuser = urllib2.urlopen('http://api.randomuser.me/?results=10')
results = json.loads(randomuser.read())
users=results['results']
processed_users = []
headers = {'content-type': 'application/json'}

for raw_user in users:
		user = raw_user['user']
		user.pop('sha1')
		user.pop('sha256')
		user.pop('registered')
		user.pop('md5')
		user.pop('salt')
		user.pop('cell')
		user.pop('version')
		user.pop('SSN')
		user['born'] = user.pop('dob')
		user['password_test']  = user['password'] 
		user['password'] = generate_password_hash(user['password'])
		user['role'] = 'test'
		r = requests.post(url, data=json.dumps(user), headers=headers)
		resp = json.loads(r.content)
		print resp
		processed_users.append({'id': resp['_id'], 'etag': resp['_etag']})
print '---------------------------------Adding friends to users-----------------------'
print processed_users
uids = [x['id'] for x in processed_users]
for user in processed_users:
		friends=set(random.sample(uids,int(random.random()*10)))
		friends-set([user['id']])
		headers['If-Match'] = user['etag']
		friends_dict = {}
		friends_dict['friends'] = list(friends)
		print friends_dict
		print headers
		r = requests.patch(url + '/' + user['id'], data=json.dumps(friends_dict), headers=headers)
		print r.content
print '---------------------------------Adding posts to users-----------------------'
for user in processed_users:
    for _ in range(20):
				post={}
				post['type'] = 'text'
				post['author'] = user['id']
				post['content'] = generate_paragraph()[2]
				r = requests.post(url + '/' + user['id'] + '/posts', data=json.dumps(post), headers={'content-type': 'application/json'})
				print r.content
		
