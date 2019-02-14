'use strict'

// **********************
// Configurtation Serveur
// **********************

const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql');
const cors = require('cors')
const app = express()

const PORT = 8090 // sera dans un include par la suite (config)
const CONTENT_TYPE_JSON = 'application/json'
const CONTENT_TYPE_HTML = 'text/html'
const HTTP_OK = 200

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());

let USER_LIST = []





// **********************
// Information BD sera dans un include par la suite
// **********************

const hostDB = "192.168.0.68"
const con = mysql.createConnection({
  host: hostDB,
  user: "root",
  password: "abc123...",
  database: "extranetisi",
  port: 3307
});





// **********************
// GET ET POST REQUEST + RESPONSE
// **********************

app.get('/', function (request, response) {
  response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_HTML })
  response.end('<h1>Home page</h1>')
})

app.get('/users', function (request, response) {
  getAllBD()
  console.log(USER_LIST)
  writeJSONResponse(request, response, USER_LIST)
})

app.post('/userspost', function (req, res) {
  const userName = req.body.username
  const email = req.body.email
  const password = req.body.password
  insertRow(userName, email, password)
});

app.post('/userdelete', function (req, res) {
  const email = req.body.email
  deleteRow(email)
});

app.post('/userupdate', function (req, res) {
  updateRow(req.body.userName, req.body.email, req.body.password)
});

/* ne pas enlever, ce nest pas un simple console.log, le app.listen
 effecture une action de verification lecoute du port du serveur */
app.listen(PORT, function () {
  console.log('Server listening on: http://localhost:%s', PORT)
})

function writeJSONResponse(request, response, result) {
  console.log('ID:   ', request.params.id ? request.params.id : '')
  console.log('BODY: ', request.body)
  response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
  response.end(JSON.stringify(result, null, 2))
}






// **********************
// FONCTION BD, seront dans un fichier include par la suite egalement
// **********************

function getAllBD() {
  con.query("SELECT * FROM user", function (err, result, fields) {
    if (err) throw err;
    console.log("Le retour JSON dans la function", JSON.stringify(result))
    USER_LIST = result
  });

}

function insertRow(userName, email, password) {
  const sql = "INSERT INTO user (username, email, password) VALUES ?";
  const values = [[userName, email, password]];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

function deleteRow(email) {
  const sql = "DELETE FROM user WHERE email =  '" + email + "' ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
}


function updateRow(userName, email, password) {
  const sql = "UPDATE user SET username = '" + userName + "', password= '" + password + "' WHERE email = '" + email + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
}




