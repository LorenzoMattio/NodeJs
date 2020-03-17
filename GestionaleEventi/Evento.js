
var moduloExpress = require("express");

class Evento {
	costructor(nomeEvento, numeroPartecipanti){
		this.nomeEvento = nomeEvento;
		this.numeroPartecipanti = numeroPartecipanti;
	}
	
	get getNomeEvento(){
		this.nomeEvento;
	}
	
	get getNumeroPartecipanti(){
		this.numeroPartecipanti;
	}
	
	set setNomeEvento(x){
		this.nomeEvento = x;
	}
	set setNumeroPartecipanti(x){
		this.numeroPartecipanti = x;
	}
}