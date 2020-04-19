var Opera = require("./Opera.js").Opera;

class Autore{
	
	constructor(nome){
		this.nome = nome;
		this.listaOpere = new Array();  // Questo sarà un array di oggetti Opere
	}
	
	get getNome(){
		return this.nome;
	}
	
	get getListaOpere(){
		return this.listaOpere;
	}
	
	set setNome(a){
		this.nome = a;
	}
	
	aggiungiOpera(nome, testo, commento){
		var miaOpera = new Opera(nome, testo, commento);
		this.listaOpere.push(miaOpera);
	}

}

module.exports={Autore:Autore}