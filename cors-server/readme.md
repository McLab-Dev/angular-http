
# install
-- mkdir cors-server && npm init -y 
npm i express
npm i cors 

# run server
ng serve --port 8000 -open 

# api url
http://localhost:5000/candy
{
    "candy": "bubble-gum"
}

HEADERS
-------
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8

Access-Control-Allow-Credentials: true
