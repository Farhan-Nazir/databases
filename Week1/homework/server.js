let express = require("express");

let mysql = require("mysql");
let query = require("./model/query");

//Create App
let app = express();

//Listen App
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("App is started on " + port);
});

//Mysql Connection
var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  multipleStatements: true
  //database: "world"
});

connection.connect(err => {
  err ? connection.end() : console.log("Connection Successfull");
});
// Select the world
connection.query("USE new_world", error => {
  error ? error : console.log("Database changed to world");
  query(connection);
});
