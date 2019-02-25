'use strict';
let Tasks = require('../model/taskModel.js');


exports.taskList = function(req, res) {
  Tasks.getTaskList(function(err, task) {
    if (err)
      res.send(err);
      // console.log('res', task);
    res.send(task);
  });
};



exports.addNewTask = function(req, res) {
  //var newTask = new Tasks(req.body);

  //handles null error 
   if(!req.body.task){
            res.status(400).send({ error:true, message: 'Please provide task' });
        }
else{
  Tasks.addTask(req.body, function(err, task) {
    if (err)
      res.send(err);
    console.log(req.body);
    res.json(task);
  });
}
};


exports.getTask = function(req, res) {
  Tasks.getTaskById(req.params.task_id, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.updateTask = function(req, res) {
  Tasks.updateById(req.params.task_id, new Tasks(req.body), function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.deleteTask = function(req, res) {
  Tasks.removeTask( req.params.task_id, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};