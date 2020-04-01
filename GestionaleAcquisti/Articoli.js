/**
 * http://usejsdoc.org/
 */

var Articolo = require("./Articolo.js").MioArticolo;

var mieiArticoli = new Array();

class Articoli {
	
	add(nomeA, qtaA){
		var mioOggettoArticolo = new Articolo(nomeA, qtaA);
		mieiArticoli.push(mioOggettoArticolo);
	}
	get getMioArray(){
		return mieiArticoli;
	}
}
module.exports = {MieiArticoli:Articoli}