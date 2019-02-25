"user strict";
let sql = require("./db-connection.js");

//Task object constructor
let user = function(user) {
  this.email = user.email;
  this.password = user.password;
};
user.createUser = (newUser, result) => {
  sql.query("INSERT INTO users set ?", newUser, function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
user.getUserById = (user_id, result) => {
  sql.query("Select email from users where user_id = ? ", user_id, function(
    err,
    res
  ) {
    if (err) {
      console.log("error: ", err);
      result(err);
    } else {
      result(res);
    }
  });
};
user.getUserList = result => {
  sql.query("Select * from users", function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

user.remove = function(user_id, result) {
  sql.query("DELETE FROM users WHERE user_id = ?", [user_id], function(
    err,
    res
  ) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = user;
