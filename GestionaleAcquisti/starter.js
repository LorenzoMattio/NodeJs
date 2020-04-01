var express = require("express");
var app = express();
app.set('view engine', 'ejs');

var mieiArticoli = require("./Articoli.js").MieiArticoli;
var mioOggettoArticoli = new mieiArticoli();

app.listen(1333,function(){
	
	app.get("/", function (req, res, next){
		
		res.sendFile(__dirname + "/html/index.html");
		
	});
	
	app.get("/salva", function (req, res, next){
		
		var parametroNome = req.query.nomeArticolo;
		var parametroQuantita = req.query.qta;
		mioOggettoArticoli.add(parametroNome, parametroQuantita);
		res.send("Articolo salvato correttamente");
		
	});
	
	app.get("/visualizza", function (req, res, next){
			
		res.render("./visualizza.ejs", {miaVariabile:mioOggettoArticoli});
			
	});
	
	
});