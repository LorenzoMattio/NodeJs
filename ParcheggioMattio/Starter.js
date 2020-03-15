// Si desidera simulare un parcheggio a pagamento per autovetture. Si sviluppi la classe Vettura, avente i seguenti campi: targa, oraArrivo, oraScadenza, 
// dove le ore sono interi compresi tra 0 e 23. Il parcheggio è rappresentato mediante la classe Parcheggio. Il costruttore inizializza un parcheggio con 
// massima capienza numPosti e 0 vetture. I metodi entraVettura (parametri: targa, oraArrivo e oraScadenza) ed esceVettura(parametri: targa) aggiungono e 
// rimuovono, rispettivamente, le vetture dei clienti dal parcheggio. Viene restituito il valore true (stamparlo a video) solo nel caso l’operazione possa 
// essere eseguita. Il metodo aggiornaOra incrementa di una unità l’ora corrente, ed elimina tutte le vetture il cui tempo sia scaduto. Il metodo promozione 
// offre gratuitamente oreGratuite a tutte le vetture nel parcheggio il cui numero di targa termini con le cifre codice, dove codice deve essere un numero di 
// due cifre dato in input. Il metodo statVetture stampa in una pagina HTML il contenuto dell’ arraylist con tutte le vetture che hanno il più alto numero di 
// ore di parcheggio pagato. Creare il form HTML e tutti gli endpoint al fine di testare l’esercizio

// --- Moduli ---
var bodyParser = require("body-parser");
var fs = require("fs");
var Express = require("express");

// --- Pagine HTMl ---
const homepage = fs.readFileSync("filehtml/index.html");
const entraVettura = fs.readFileSync("filehtml/entraVettura.html");
const esceVettura = fs.readFileSync("filehtml/esceVettura.html");
const aggiornaTempo = fs.readFileSync("filehtml/aggiornaTempo.html")


// --- Classi ---
var Vettura= require("./Vettura.js").nuovaVettura;
var Parcheggio= require("./Parcheggio.js").nuovoParcheggio;

var parcheggio=new Parcheggio(100, 0, 6);

var objExpress= new Express;
objExpress.use(bodyParser.json());
objExpress.use(bodyParser.urlencoded({extended:true}));

// ----- PARTENZA SERVER ------
var server = objExpress.listen(1700, function(){
	console.log("Server in esecuzione!");
});


//----- HOMEPAGE ------
objExpress.get("/",function (request,response,next){
	response.write(homepage);
	console.log("/homepage");
	response.end();
});

//----- ENTRAVETTURA ------
objExpress.get("/entraVettura",function (request, response, next){
	response.write(entraVettura);
	console.log("/entraVettura");
	response.end();
});

//----- response > ENTRAVETTURA  ------
objExpress.get("/responseEsceVettura",function (request, response, next){
	var targa = request.body.targa;
	var orarioArrivo = Number(request.body.orarioArrivo);
	var orarioScadenza = Number(request.body.orarioScadenza);
	var vettura = new Vettura(targa, orarioArrivo, orarioScadenza);
	parcheggio.entraVettura(vettura);
	response.write(homepage);
	console.log("/responseEntraVettura");
	response.end();
});

// ----- ESCEVETTURA ------
objExpress.get("/esceVettura",function (request, response, next){
	response.write(esceVettura);
	console.log("/esceVettura");
	response.end();
});

//----- response > ESCEVETTURA ------
objExpress.get("/responseEsceVettura",function (request, response, next){
	var targa=request.body.targa;
	parcheggio.esceVettura(targa);
	console.log("/responseEsceVettura");
	response.write(homepage);
	response.end();
});

//----- AGGIORNATEMPO ------
objExpress.get("/aggiornaTempo",function (request, response, next){
	parcheggio.aggiornaOra()
	response.write(aggiornaTempo);
	console.log("/aggiornaTempo");
	
	response.end();
});