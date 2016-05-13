var express = require('express');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var theParser = require('body-parser');

app.use(theParser.urlencoded({extended: false}));
app.use(theParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
	var parameters = [];
	for (var info in req.query){
		parameters.push({'attribute': info, 'value': req.query[info]})
	}
	var theContext = {};
	theContext.reqList = parameters;
	res.render('get', theContext);
});

app.post('/',function(req,res){
//For values in URL
if(req.query != NULL){
	var parameters1 = [];
	for (var info in req.query){
		parameters1.push({'attribute': info, 'value': req.query[info]})
	}
	var theContext1 = {};
	theContext1.reqList = parameters1;
	res.render('post', theContext1);
}
else{
//For values in body
  var parameters = [];
	for (var info in req.body){
		parameters.push({'attribute': info, 'value': req.body[info]})
	}
	var postContext = {};
	postContext.reqList = parameters;
	res.render('post', postContext);
}});

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});