var express = require("express");
var app = express();
var handlebars = require("express-handlebars").create({defaultLayout: 'main'});
var request = require("request");

var mysql = require("mysql");
var pool = mysql.createPool({
	
	host: 'localhost',
	user: 'student',
	password: 'default',
	database: 'student'
});

app.engine("handlebars", handlebars.engine);
app.set("view engine", handlebars);
app.set("port", 3306);

app.get('/', function(req, res,next){
	var context = {};
	var table = document.getElementById("workoutTable");
	var row = table.insertRow(0);
	var cell1 = row.insertCell(0);
	cell1.innerHTML = "This is a new cell";
});

/*app.get('/reset-table',function(req,res,next){
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});*/

app.listen(app.get("port"), function(){
	console.log("Express started. Press Ctrl-C to terminate.");
});