// Lorenzo mattio
var express = require('express');
var app = express();
var fs = require("fs");

const homepage = fs.readFileSync("views/home.html");
const form = fs.readFileSync("views/form.html");

var Prenotazione= require("./Prenotazione.js");
var Evento= require("./Evento.js");

var eventi = ["evento 1", "evento 2", "evento 3"];

var arrayPrenotazioni = [];


app.set('view engine', 'ejs');



app.get("/",function (req,res){
	res.write(homepage);
	console.log("--> Homepage");
	res.end();
});

app.get("/eventi",function (req,res){
	res.render('./views/index.ejs', {eventi: eventi});
	console.log("--> Eventi");
});


app.get("/aggiungiPrenotazione",function (req,res){
	res.write(form);
	console.log("--> aggiungiPrenotazione");
	res.end();
});

app.get("/aggiungiPrenotazione",function (req,res){
	res.write(form);
	console.log("--> aggiungiPrenotazione");
	res.end();
});

app.post("/add",function (req,res,next){
	var nome = req.body.nome;
	var cognome = req.body.cognome;
	var n = Number(req.body.numeroP);
	var prenotazione = new Prenotazione(nome,cognome,n);
	arrayPrenotazioni.push(prenotazione);
	console.log("--> add");
	res.end();
});


app.listen(1701);