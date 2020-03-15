/**
 * http://usejsdoc.org/
 */

var mioBodyParser = require("body-parser");
var moduloFS = require("fs");
var moduloExpress = require("express");

class Vettura{
	
	constructor(targa,oraAtt,oraA,oraS){
		this.targa=targa;
		this.oraAtt=oraAtt;
		this.oraA=oraA;
		this.oraS=oraS;		
	}
	
	
	get getOraA(){
		return this.oraA;
	}
	
	set setOraA(oraA){
		this.oraA=oraA;
	}
	
	getOraS(){
		return this.oraS;
	}
	
	set setOraS(oraS){
		this.oraS=oraS;
	}
	
	get getTarga(){
		return this.targa;
	}
	
	set setTarga(targa){
		this.targa=targa;
	}
	
}
	

module.exports={nuovaVettura:Vettura}

	
	
	
	
	
	
	
	
	
	
	
	
	