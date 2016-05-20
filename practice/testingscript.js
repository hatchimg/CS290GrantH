var express = require("express");
var app = express();

var handlebars = require("express-handlebars").create({defaultLayout:"main"});
var session = require("express-session");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: "password"}));

app.set("view engine", "handlebars");
app.set("port", "2000");

app.get("/", function(req, res){
	var context = {};
	context.count = session.count || 0;
	req.session.count = context.count + 1;

	render("sessionstarted", context);
});

app.addEventListener("listen", "port");