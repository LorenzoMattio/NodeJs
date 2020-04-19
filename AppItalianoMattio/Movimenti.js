var Movimento = require("./Movimento.js").Movimento;

class Movimenti{
	
	constructor(){
		this.listaMovimenti = new Array(); 
	}
	
	get getListaMovimenti(){
		return this.listaMovimenti;
	}
	
	aggiungiMovimento(nome){
		var mioMovimento = new Movimento(nome);
		this.listaMovimenti.push(mioMovimento);
	}
}

module.exports={Movimenti:Movimenti}
	