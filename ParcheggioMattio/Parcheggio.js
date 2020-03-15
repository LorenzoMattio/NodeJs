var bodyParser = require("body-parser");
var fs = require("fs");
var Express = require("express");
var VettureInterne = new Array();

class Parcheggio{
	
	constructor(numeroPosti,numeroVetture,oraCorrente){
		this.numeroPosti = numeroPosti;
		this.numeroVetture = numeroVetture;
		this.oraCorrente = oraCorrente;		
	}
	
	
	get getOraCorrente(){
		return this.oraCorrente;
	}
	
	set setOraCorrente(oraCorrente){
		this.oraCorrente = oraCorrente;
	}
	
	get getnumeroPosti(){
		return this.numeroPosti;
	}
	
	set setnumeroPosti(numeroPosti){
		this.numeroPosti = numeroPosti;
	}
	
	get getnumeroVetture(){
		return this.numeroVetture;
	}
	
	set setnumeroVetture(numeroVetture){
		this.numeroVetture = numeroVetture;
	}
	
	stampa(){
		return this.numeroPosti + " " + this.numeroVetture
	}
	
	entraVettura(vettura){
		VettureInterne.push(vettura);
		console.log(VettureInterne);
	}
	
	esceVettura(targa){
		var  tmp=new Array();
		VettureInterne.forEach(vettura => {
			if(vettura.getTarga != targa){
				tmp.push(vettura);
			}
		});
		VettureInterne = tmp;
		console.log(VettureInterne);
	}
	
	aggiornaOra(oraCorrente){
		this.oraCorrente += 1;
		console.log(oraCorrente);
	}
	
}

module.exports = {nuovoParcheggio:Parcheggio}