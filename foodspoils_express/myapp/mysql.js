var mysql      = require('mysql');
 var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'evan',
   password : 'strawberry',
   database : 'foodspoils'
 });

function executeSqlQuery(query) {
  connection.connect();
  var result = connection.query(query, connectionCallback);
  connection.end();
  return result;
}

function connectionCallback(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
    return rows;
  else
    console.log('Error while performing Query.');
}

function getAllEntries() {
  return executeSqlQuery('SELECT * FROM foodspoils');
}

 function addEntryFromPostRequest(request) {
   var requestBody = request.body;
   var columnNames = "date_discovered,";
   var valueNames = new Date().toISOString().slice(0, 19).replace('T', ' ') + ",";
   for (var dataName in requestBody) {
     columnNames += dataName + ",";
     valueNames += requestBody[dataName] + ",";
   }

   executeSqlQuery('INSERT INTO foodspoils (' + columnNames + ') VALUES ('
    + valueNames + ')');
 }

 module.exports.addEntryFromPostRequest = addEntryFromPostRequest;
 module.exports.getAllEntries = getAllEntries;
