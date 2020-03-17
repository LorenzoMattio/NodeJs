
var moduloExpress = require("express");

class Prenotazione {
	costructor(nome, cognome, numero){
		this.nome = nome;
		this.cognome = cognome;
		this.numero = numero;
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