
class Opera{
	
	constructor(nome, testo, commento){
		this.nome = nome;
		this.testo = testo;
		this.commento = commento;
	}
	
	get getNome(){
		return this.nome;
	}
	
	get getTesto(){
		return this.testo;
	}
	
	get getCommento(){
		return this.commento;
	}
	
	set setNome(a){
		this.nome = a;
	}
	
	set setTesto(a){
		this.testo = a;
	}
	
	set setCommento(a){
		this.commento = a;
	}	
	
}

module.exports={Opera:Opera}