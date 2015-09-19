var mysql      = require('mysql');
 var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'evan',
   password : 'strawberry',
   database : 'foodspoils'
 });






 function addEntryFromPostRequest(request) {


   var requestBody = request.body;
   var columnNames = "date_discovered,";
   var valueNames = new Date().toISOString().slice(0, 19).replace('T', ' ') + ",";
   for (var dataName in requestBody) {
     columnNames += dataName + ",";
     valueNames += requestBody[dataName] + ",";
   }

   connection.connect();

   connection.query('INSERT INTO foodspoils (' + columnNames + ') VALUES (' + valueNames + ')', function(err, rows, fields) {
     if (!err)
       console.log('The solution is: ', rows);
     else
       console.log('Error while performing Query.');
   });


   connection.end();
 }

 module.exports.addEntryFromPostRequest = addEntryFromPostRequest;
