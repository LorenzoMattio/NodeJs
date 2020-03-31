var express = require("express");
var app = express();

app.listen(1333, function(){
	app.get("/", function(req, res, next){
		res.sendFile(__dirname + "/html/miofile.html");
	});
	app.get("/salva", function(req, res, next){
		
	});
	
	
});