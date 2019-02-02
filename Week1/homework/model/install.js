const fs = require("fs");
const path = require("path");

function install(connection, app) {
  app.get("/install", (req, res) => {
    // create the database
    let queries = fs
      .readFileSync(path.join(__dirname, "./world.sql"))
      .toString();
    connection.query(queries, err => {
      if (err) throw err;
      console.log("Successfully Imported!!");
      res.send("Successfully Imported!!");
    });
  });
}

module.exports = install;
