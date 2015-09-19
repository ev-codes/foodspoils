var mysql      = require('mysql');
 var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'evan',
   password : 'strawberry',
   database : 'foodspoils'
 });

 connection.connect();

 connection.query('SELECT * from spoils', function(err, rows, fields) {
   if (!err)
     console.log('The solution is: ', rows);
   else
     console.log('Error while performing Query.');
 });

 connection.end();
