var express = require("express");
var app = express();

var handlebars = require("express-handlebars").create({defaultLayout:"main"});
var session = require("express-session");
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: "password"}));

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 2000);

app.get("/", function(req, res, next){
	var context = {};
	if(!req.session.name){
		res.render("homepage", context);
		return;
	}
	context.name = req.session.name;
	context.count = req.session.toDo.length || 0;
	context.toDo = req.session.toDo || [];
	console.log(context.toDo);
	res.render("sessionstarted", context);
});

app.post("/", function(req, res){
	var context = {};
	
	if(req.body = ["submitName"]){
		req.session.name = req.body.name;
		req.session.toDo = [];
		req.session.curId = 0;
	}
	
	if(!req.session.name){
		res.render("homepage", context);
		return;
	}
	if(req.body = ["submitNew"]){
		req.session.toDo.push({"name": req.body.newItem, "id": req.session.curId})
		req.session.curId++;
	}
	
	
	if(req.body = ["Done"]){
		req.session.toDo = req.session.toDo.filter(function(e){
			return e.id != req.body.id;
		})
	}
	
	context.name = req.session.name;
	context.count = req.session.toDo.length;
	context.toDo = req.session.toDo;
	console.log(context.toDo);
	res.render("sessionstarted", context);
});

app.listen(app.get("port"), function(){
console.log("Express started, ctrl c to exit.")});
