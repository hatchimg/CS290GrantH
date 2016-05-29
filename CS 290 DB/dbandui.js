var express = require("express");
var app = express();
var mysql = require("mysql");
var handlebars = require("express-handlebars").create({defaultLayout: "main"});
app.engine("handlebars", handlebars.engine);
app.use(express.static("public"));


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
	
	res.render("dbandui");
	
});

app.get("/all", function(req, res, next){
	var context = {};
	pool.query("SELECT * FROM workouts", function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
	res.send(JSON.stringify(rows));
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

