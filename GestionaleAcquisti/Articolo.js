/**
 * http://usejsdoc.org/
 */

class Articolo {
	
	constructor (articolo, quantita) {
		this.nomeArticolo = articolo;
		this.qta = quantita;
	}
	get getRitornaNome(){
		return this.nomeArticolo;
	}
	get getRitornaQuantita(){
		return this.qta;
	}
}
module.exports = {MioArticolo:Articolo}