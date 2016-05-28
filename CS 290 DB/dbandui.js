var express = require("express");
var app = express();
var mysql = require("mysql");
var handlebars = require("express-handlebars").create({defaultLayout: "main"});
app.engine("handlebars", handlebars.engine);


var pool = mysql.createPool({
	connectionLimit: '10',
	host  : 'localhost',
	user  : 'student',
	password: 'default',
	database: 'student'
});

app.set("view engine", "handlebars");
app.set("port", 2500);

app.get("/", function(req, res, next){
	var context = {};
	pool.query("SELECT * FROM workouts", function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
	var temp = JSON.stringify(rows);
	var data = JSON.parse(temp);
	context.table = data;
	res.render("dbandui", context);
	});
	
});


app.get("/add-item", function(req, res, next){
	var context = {};
	var payload = {
		name: req.query.name,
		reps: req.query.reps,
		weight: req.query.weight,
		date: req.query.date,
		lbs: req.query.lbs
	}
	
	pool.query("INSERT INTO workouts SET ?", payload, function(err, result){
		if(err){
			next(err);
			return;
		}
		
		context.results = "Inserted ID " + result.insertId;
		res.render("added", context);
	});
	
});

function addRow(){

	if(document.getElementById("name").value == ""){
		alert("Name must be filled out.");
		return;
	}
	var name = document.getElementById("name").value;
	var reps = document.getElementById("reps").value;
	var weight = document.getElementById("weight").value;
	var date = document.getElementById("date").value;
	var type = document.getElementById("unit");
	
	var req = new XMLHttpRequest();
	req.open("GET", "52.32.212.47:2500/add-item?name=" + name + "reps=" + reps + "weight=" + weight + "&date=" + date + "&lbs=" + type, true);
	req.send(null);
	
	if(req.status >= 200 && req.status < 400){
	//add row to HTML table
	
	var newRow = document.createElement("TR");
	
	//name
	var nameCell = document.createElement("TD");
	nameCell.innerHTML = document.getElementById("name").value;
	newRow.appendChild("nameCell")
	
	//reps
	var repsCell = document.createElement("TD");
	repsCell.innerHTML = document.getElementById("reps").value;
	newRow.appendChild("repsCell")
	
	//weight
	var weightCell = document.createElement("TD");
	weightCell.innerHTML = document.getElementById("weight").value;
	newRow.appendChild("weightCell")
	
	//date
	var dateCell = document.createElement("TD");
	dateCell.innerHTML = document.getElementById("date").value;
	newRow.appendChild("dateCell")
	
	//type
	var typeCell = document.createElement("TD");
	typeCell.innerHTML = document.getElementById("type").value;
	newRow.appendChild("typeCell")
	
	
	getElementById("myTable").appendChild(newRow);
	}
	else{
		console.log("Row not successfully added. Error code " + req.status);
	}
	

}

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
	console.log("Express started, press Ctrl-C to exit.");
});

