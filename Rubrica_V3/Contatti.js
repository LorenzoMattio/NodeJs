class Contatto{

    constructor(nome,cognome,telefono,mail){
        this.nome=nome;
        this.cognome=cognome;
        this.telefono=telefono;
    }

    concatena(){
        return this.nome+" "+this.cognome+" "+this.mail;
    }


    set Setindirizzo(indirizzo){
        this.indirizzo=indirizzo;
    }

    get Getnome(){
        return this.nome;
    } 


    concatena2(){
        return this.nome+" "+this.cognome+" "+this.telefono+" "+this.mail+" "+this.indirizzo;
    }

}

module.exports={mioContatto:Contatto}
