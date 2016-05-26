var express = require("express");
var app = express();
var handlebars = require("express-handlebars").create({default layout: 'main'});
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
app.set("port", 2500);

app.get('/reset-table',function(req,res,next){
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
});

app.listen(app.get("port"), function(){
	console.log("Express started. Press Ctrl-C to terminate.");
});