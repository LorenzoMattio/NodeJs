/*Nicola Bima 5C*/

/*importo moduli*/
var mioBodyParser = require("body-parser");
var moduloFS = require("fs");
var moduloExpress = require("express");

/*importo classi*/
var Parcheggio= require("./Parcheggio.js").nuovoParcheggio;
var Vettura= require("./Vettura.js").nuovaVettura;

var parcheggio=new Parcheggio(100,0,11);

const homepage= moduloFS.readFileSync(__dirname+"/homepage.html");
const formEntraVettura= moduloFS.readFileSync(__dirname+"/formEntraVettura.html");
const formEsceVettura= moduloFS.readFileSync(__dirname+"/formEsceVettura.html");

/*classe*/
var objExpress= new moduloExpress;
objExpress.use(mioBodyParser.json());
objExpress.use(mioBodyParser.urlencoded({extended:true}));

var server = objExpress.listen(1701,function(){
	console.log("Server in esecuzione!");
});


objExpress.get("/",function (request,response,next){
	response.write(homepage);
	console.log("--> Homepage");
	response.end();
});

objExpress.get("/formEntraVettura",function (request,response,next){
	response.write(formEntraVettura);
	console.log("--> EntraVettura");
	response.end();
});


objExpress.get("/formPromozione",function (request,response,next){
	response.write(formPromozione);
	console.log("--> Promozione");
	response.end();
});

objExpress.get("/formEsceVettura",function (request,response,next){
	response.write(formEsceVettura);
	console.log("--> EsceVettura");
	response.end();
});


objExpress.post("/EntraVettura",function (request,response,next){
	var targa=request.body.targa;
	var oraA=Number(request.body.oraA);
	var oraS=Number(request.body.oraS);
	var vettura=new Vettura(targa,parcheggio.getOraCorrente,oraA,oraS);
	parcheggio.entraVettura(vettura);
	response.write(homepage);
	console.log("--> EntraVettura");
	response.end();
});

objExpress.post("/EsceVettura",function (request,response,next){
	var targa=request.body.targa;
	parcheggio.esceVettura(targa);
	console.log("--> EsceVettura");
	response.write(homepage);
	response.end();
});


objExpress.get("/AggiornaOra",function (request,response,next){
	var oraCorrente= parcheggio.getOraCorrente();
	parcheggio.AggiornaOra(oraCorrente);
	console.log("--> AggiornaOra");
	response.write(homepage);
	response.end();
});



objExpress.post("/Promozione",function (request,response,next){
	var targa=request.body.targa;
	var oreG=request.body.oreG;
	parcheggio.Promozione(targa,oreG);
	console.log("--> Promozione");
	response.write(homepage);
	response.end();
});

