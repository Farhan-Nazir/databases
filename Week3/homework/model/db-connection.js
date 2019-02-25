'user strict';

var mysql = require('mysql2');

//local mysql db connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fn_todo'
})

connection.connect(function(err) {
    if (err) throw err;
    console.log('DB successfully connected !!');
});

module.exports = connection;