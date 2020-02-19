
var moduloExpress = require("express");
var moduloFS = require("fs"); 


var objExpress = new moduloExpress;  //istanzio la classe
var mioBodyParser = require("body-parser");

const homepage = moduloFS.readFileSync("sito/homepage.html");


objExpress.use(mioBodyParser.json());
objExpress.use(mioBodyParser.urlencoded({extended:true})); //possiamo recuperare qualsiasi parametro

var server = objExpress.listen(2000,function () {
    console.log("Il server è in esecuzione");
});


objExpress.get("/",function (request,response,next) {
    //response.setHeader("Content-type","text/plain");
    response.sendFile(__dirname+"/sito/homepage.html");
    console.log("Sono nella Homepage")
});

objExpress.get("/visualizza",function (request,response,next) {
    var testoFIle = JSON.parse(moduloFS.readFileSync('Rubrica.json', 'utf-8')) // prende la stringa
    response.send(testoFile);
    console.log("Dati Spediti e  Visualizzati")
});


objExpress.post("/carica",function (request,response,next) {
	
    var cognome = request.body.cognome;		// Prende il parametro in post, è un modulo da importare
    var nome = request.body.nome;
    var telefono = request.body.telefono;
    
    if (cognome.length != 0 && nome.length !=0 && telefono.length !=0) {
    var ParserJsonRubrica = JSON.parse(moduloFS.readFileSync('Rubrica.json', 'utf-8'))
    ParserJsonRubrica.push({"Nome":nome,"Cognome":cognome,"Telefono":telefono})
    jsonStr = JSON.stringify(ParserJsonRubrica);
    
        moduloFS.writeFileSync("Rubrica.json",jsonStr);
        console.log(nome+","+cognome+","+telefono);
    }
    
    response.end();
    
})

objExpress.post("/elimina",function (request,response,next) {
    var cognome = request.body.cognome;		// Prende il parametro in post, è un modulo da importare
    
    var ParserJsonRubrica = JSON.parse(moduloFS.readFileSync('Rubrica.json', 'utf-8'))
    
    for (var i=0 ; i < ParserJsonRubrica.length ; i++)
    {
        if (ParserJsonRubrica[i].Cognome == cognome) {
            ParserJsonRubrica.splice( i, 1); 
            
        }
    }

    jsonStr = JSON.stringify(ParserJsonRubrica);
    
    moduloFS.writeFileSync("Rubrica.json",jsonStr);

    
    console.log("Eliminazione Completata");
    response.end();
    
})









