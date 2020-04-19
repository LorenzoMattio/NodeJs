var Autore = require("./Autore.js").Autore;

class Movimento{
	
	constructor(nome){
		this.nome = nome;
		this.listaAutori = new Array();  // Questo sarà un array di oggetti Autori
	}
	
	get getNome(){
		
		return this.nome;
	}
	
	get getAutori(){
		return this.listaAutori;
	}
	
	aggiungiAutore(b){
		var mioAutore = new Autore(b);
		this.listaAutori.push(mioAutore);
	}

	
}

module.exports={Movimento:Movimento}