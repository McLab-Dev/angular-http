
# install
-- mkdir cors-server && npm init -y 
npm i express
npm i cors 

# run server
ng serve --port 8000 -open 

# api url
curl -v http://localhost:5000/peoples
[
  {
    "id": "1",
    "name": "George Eliot",
    "IsRegistered": true
  },
  {
    "id": "2",
    "name": "Bob Smith",
    "IsRegistered": false
  }
]

HEADERS
-------
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8

Access-Control-Allow-Credentials: true
