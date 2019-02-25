'user strict';
var sql = require('./db-connection.js');

//Task object constructor
let Task = (task) => {
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};
Task.addTask = (newTask, result) => {    
        sql.query("INSERT INTO tasks set ?", newTask, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res);
                    result(null, res);
                }
            });           
};
Task.getTaskById = (task_id, result) => {
        sql.query("Select * from tasks where task_id = ?", task_id, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
Task.getTaskList = (result) => {
        sql.query("Select * from tasks", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
            
                 result(null, res);
                }
            });   
};
Task.updateById = (task_id, tasks, result) => {
  sql.query("UPDATE tasks SET task = ? AND status = ? WHERE task_id = ?", [tasks.task, tasks.status, task_id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
Task.removeTask = function(task_id, result){
     sql.query("DELETE FROM tasks WHERE task_id = ?", [task_id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= Task;