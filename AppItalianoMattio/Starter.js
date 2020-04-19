var express =require("express");
var app=express();
var bodyParser=require("body-parser");
app.set('view engine', 'ejs');
var fs = require("fs");


var Movimenti = require("./Movimenti.js").Movimenti;

var mieiMovimenti = new Movimenti();

mieiMovimenti.aggiungiMovimento("Movimento uno");
mieiMovimenti.getListaMovimenti[0].aggiungiAutore("Pirandello");
mieiMovimenti.getListaMovimenti[0].getAutori[0].aggiungiOpera("Opera di Pirandello","sono il testo infinitooooo", "Ques'opera tratta di....");

mieiMovimenti.getListaMovimenti[0].aggiungiAutore("Ungaretti");
mieiMovimenti.getListaMovimenti[0].getAutori[1].aggiungiOpera("Opera di Ungaretti","sono il testo infinitooooo", "Ques'opera tratta di....");

mieiMovimenti.getListaMovimenti[0].aggiungiAutore("Virgilio");
mieiMovimenti.getListaMovimenti[0].getAutori[2].aggiungiOpera("Opera di Virgilio","sono il testo infinitooooo", "Ques'opera tratta di....");



mieiMovimenti.aggiungiMovimento("Movimento due");
mieiMovimenti.getListaMovimenti[1].aggiungiAutore("Dante");
mieiMovimenti.getListaMovimenti[1].getAutori[0].aggiungiOpera("Opera di Dante","sono il testo infinitooooo", "Ques'opera tratta di....");

mieiMovimenti.getListaMovimenti[1].aggiungiAutore("Manzoni");
mieiMovimenti.getListaMovimenti[1].getAutori[1].aggiungiOpera("Opera di Manzioni","sono il testo infinitooooo", "Ques'opera tratta di....");

mieiMovimenti.getListaMovimenti[1].aggiungiAutore("Alessandro Magno");
mieiMovimenti.getListaMovimenti[1].getAutori[2].aggiungiOpera("Opera di Alessandro Magno","sono il testo infinitooooo", "Ques'opera tratta di....");

mieiMovimenti.getListaMovimenti[1].aggiungiAutore("Napoleone");
mieiMovimenti.getListaMovimenti[1].getAutori[3].aggiungiOpera("Opera di Napoleone","sono il testo infinitooooo", "Ques'opera tratta di....");



mieiMovimenti.aggiungiMovimento("Movimento tre");
mieiMovimenti.getListaMovimenti[2].aggiungiAutore("Pirandello");
mieiMovimenti.getListaMovimenti[2].getAutori[0].aggiungiOpera("Opera di Pirandello","sono il testo infinitooooo", "Ques'opera tratta di....");


console.log(mieiMovimenti.getListaMovimenti[0]);

var tmpMovimento = 0;

app.listen(1335,function(){
	
	
	app.get("/",function(req,res){
		res.sendFile(__dirname + "/html/index.html");
		tmpMovimento = 0;
		tmpAutore = 0;
		tmpOpera = 0;
	});
	
	app.get("/inizia/movimento/autore/opera",function(req,res){
		tmpOpera = req.query.opera;
		res.render("opera.ejs",{oggettoOpera:mieiMovimenti.getListaMovimenti[tmpMovimento].getAutori[tmpAutore].getListaOpere[tmpOpera]});
	});
	
	app.get("/inizia/movimento/autore",function(req,res){
		tmpAutore = req.query.autore;
		res.render("autore.ejs",{oggettoAutore:mieiMovimenti.getListaMovimenti[tmpMovimento].getAutori[tmpAutore]});
	});
	
	app.get("/inizia/movimento",function(req,res){
		tmpMovimento = req.query.movimento;
		res.render("movimento.ejs",{oggettoMovimento:mieiMovimenti.getListaMovimenti[tmpMovimento]});
	});
	
	app.get("/inizia",function(req,res){
		res.render("inizia.ejs",{oggettoRipasso:mieiMovimenti});
	});
	
	
	
	
});