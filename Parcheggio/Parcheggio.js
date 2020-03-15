/**
 * http://usejsdoc.org/
 */

var mioBodyParser = require("body-parser");
var moduloFS = require("fs");
var moduloExpress = require("express");
var VettureInterne= new Array();

class Parcheggio{
	
	constructor(nPosti,nvetture,oraCorrente){
		this.nPosti=nPosti;
		this.nvetture=nvetture;
		this.oraCorrente=oraCorrente;		
	}
	
	
	get getOraCorrente(){
		return this.oraCorrente;
	}
	
	set setOraCorrente(oraCorrente){
		this.oraCorrente=oraCorrente;
	}
	
	get getnPosti(){
		return this.nPosti;
	}
	
	set setnposti(nposti){
		this.nPosti=nPosti;
	}
	
	get getnVetture(){
		return this.nvetture;
	}
	
	set setnVetture(nvetture){
		this.nvetture=nvetture;
	}
	
	stampa(){
		return this.nPosti+" "+this.nvetture
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
		VettureInterne=tmp;
		console.log(VettureInterne);
	}
	
	AggiornaOra(oraCorrente){
		var  tmp=new Array();
		oraCorrente+=1;
		VettureInterne.forEach(vettura => {
			if(vettura.getoraS < oraCorrente){
				tmp.push(vettura);
			}
		});
		VettureInterne=tmp;
		console.log(oraCorrente);
		console.log(VettureInterne);
	}
	
	
	Promozione(targa,oreG){
		var  tmp=new Array();
		VettureInterne.forEach(vettura => {
			if(vettura.getTarga == targa){
				vettura.getOraS+=oreG;
			}
		});
		console.log(VettureInterne);
	}
}

module.exports={nuovoParcheggio:Parcheggio}
