var express =require("express");
var app=express();
var bodyParser=require("body-parser");
app.set('view engine', 'ejs');

var Stazioni=require("./Stazioni").Stazioni


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));
var mieStazioni=new Stazioni();
app.listen(1335,function(){
		
	app.get("/",function(req,res){

		res.render("home.ejs");
		
	});
	app.get("/carica",function(req,res){
		
		var arrayCitta= new Array("TORINO","MILANO","VERZUOLO","GENOVA");
		res.render("carica.ejs",{arrayCitta:arrayCitta});
		
	});	
	
	app.post("/salva",function(req,res){
		
		var max = Number(req.body.massima);
		var min = Number(req.body.minima);
		var citta = req.body.citta;
		var zona = req.body.zona
		
		mieStazioni.add(max,min,citta, zona);
		res.render("salva.ejs");
		
		//mioarray.sort((a, b) => (a.max > b.max) ? -1 : 1)
		
	});
	
	app.get("/riepilogo",function(req,res){
		res.render("riepilogo.ejs",{stazioni:mieStazioni});
	});
		
		
});