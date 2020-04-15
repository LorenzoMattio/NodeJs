class Stazione{
	
	constructor(tempMax, tempMin, citta, zona){
		this.tempMax = tempMax;
		this.tempMin = tempMin;
		this.citta = citta;
		this.data = Date.now().toString;
		this.zona = zona;
	}
	
	get getCitta(){
		
		return this.citta;
	}
	
	get getMin(){
		return this.tempMin;
	}
	
	get getMax(){	
		return this.tempMax;
	}
	
	get getData(){	
		return this.data;
	}
	
	get getZona(){	
		return this.zona;
	}
	
}

module.exports={Stazione:Stazione}