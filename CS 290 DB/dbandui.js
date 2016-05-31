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
	
	pool.query("SELECT * FROM workouts", function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
	res.send(JSON.stringify(rows));
	});
	
});


app.post("/add-item", function(req, res, next){
	
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
	});
		
	pool.query("SELECT * FROM workouts", function(err, rows, fields){
		if(err){
			next(err);
			return;
		}

		res.send(JSON.stringify(rows));
	});
	
});

app.get("/delete-row", function(req, res, next){
	
	pool.query("DELETE FROM workouts WHERE id = ?", [req.query.id], function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
	});
	
	pool.query("SELECT * FROM workouts", function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		
		res.send(JSON.stringify(rows));
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

