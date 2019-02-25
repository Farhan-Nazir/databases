'use strict';

var User = require('../model/usersModel.js');

exports.userList = function(req, res) {
  User.getUserList(function(err, user) {

    if (err)
      res.send(err);
    res.send(user);
  });
};



exports.createUser = function(req, res) {
  var newUser = new User(req.body);

  //handles null error 
   if(!newUser.email || !newUser.password){

            res.status(400).send({ error:true, message: 'Please provide email & password' });
console.log('error');
        }
else{
  
  User.createUser(newUser, function(err, user) {
    
    if (err)
      res.send(err);
    res.json(user);
    // console.log(user);
  });
}
};


exports.getUserById = function(req, res) {
  User.getUserById(req.params.user_id, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


// exports.update_a_task = function(req, res) {
//   Task.updateById(req.params.taskId, new Task(req.body), function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


exports.removeUser = function(req, res) {


  User.remove( req.params.user_id, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};