// Vettura
var bodyParser = require("body-parser");
var fs = require("fs");
var Express = require("express");

class Vettura{
	
	constructor(targa,orarioArrivo,orarioScadenza){
		this.targa=targa;
		this.orarioArrivo=orarioArrivo;
		this.orarioScadenza=orarioScadenza;		
	}
	
	get getOrarioArrivo(){
		return this.orarioArrivo;
	}
	
	set setOrarioArrivo(orarioArrivo){
		this.orarioArrivo=orarioArrivo;
	}
	
	get getOrarioScadenza(){
		return this.orarioScadenza;
	}
	
	set setOrarioScadenza(orarioScadenza){
		this.oraS=orarioScadenza;
	}
	
	get getTarga(){
		return this.targa;
	}
	
	set setTarga(targa){
		this.targa=targa;
	}
}
module.exports={nuovaVettura:Vettura}