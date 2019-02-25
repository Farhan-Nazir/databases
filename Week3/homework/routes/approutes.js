const express = require('express');
const router = express.Router();
var taskList = require('../controller/taskController');
let userList = require('../controller/usersController')

router.route('/users')
.get(userList.userList)
.post(userList.createUser);

router.route('/users/:user_id')
.get(userList.getUserById)
.delete(userList.removeUser);
  
 // todoList Routes
router.route('/tasks')
.get(taskList.taskList)
.post(taskList.addNewTask)

router.route('/tasks/:task_id')
.get(taskList.getTask)
.put(taskList.updateTask)
.delete(taskList.deleteTask);

module.exports = router;
      
