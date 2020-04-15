var Stazione=require("./Stazione.js").Stazione;

class Stazioni{

	
	constructor(){
		this.listaStazioni = new Array(); 
	}
	
	
	add(tempMax, tempMin, citta, zona){
		this.listaStazioni.push(new Stazione(tempMax, tempMin, citta, zona));
	}
	
	
	stampaMediaDati(){
		var totMin = 0;
		var totMax = 0;
		var array = new Array()
		for (let i = 0; i < this.listaStazioni.length; i++){
			totMin += this.listaStazioni[i].getMin;
			totMax += this.listaStazioni[i].getMax;
		}
		totMin = totMin / this.listaStazioni.length;
		totMax = totMax / this.listaStazioni.length;
		array.push(totMax)
		array.push(totMin)
		return array;
	}
	
	stampaCittaDati(){
		var array = new Array();
		for(var i=0; i < this.listaStazioni.length; i++){
			var a = this.listaStazioni[i].getCitta + " " + this.listaStazioni[i].getZona + " - massima: " + this.listaStazioni[i].getMax + " minima: " + this.listaStazioni[i].getMin;
			array.push(a);
		}
		return array;
	}
	
	stampaMinimaAssoluta(){
		var min = 99999999;
		for(var i=0; i < this.listaStazioni.length; i++){
			if (this.listaStazioni[i].getMin < min){
				min = this.listaStazioni[i].getMin
			}
		}
		return min;
	}
	
	stampaMassimaAssoluta(){
		var max = -1234567890;
		for(var i=0; i < this.listaStazioni.length; i++){
			if (this.listaStazioni[i].getMin > max){
				max = this.listaStazioni[i].getMax
			}
		}
		return max;
	}

}

module.exports={Stazioni:Stazioni}