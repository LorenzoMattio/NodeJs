/**
 * http://usejsdoc.org/

 *
 *
 *    /rubrica/list
 *    /rubrica/insert?cognome=ROSSI
 *    /rubrica/delete?cognome=rossi
 *    /rubrica/add  --> errore
 *
 *
 *
 *
 */



var moduloQS = require("querystring");
var moduloEX = require("express");
var moduloHttp = require("http");
var moduloURL = require("url");
var moduloFS = require("fs");  //modulo file system --- contiene delle funzioni sincrone e asincrone per la gestione dei file sul server


var server = moduloHttp.createServer(function(request,response){
	
	console.log("Sto per scrivere!");
	
	var endpoint=moduloURL.parse(request.url,true);//true trasforma url in json -- false in stringa
	
	console.log(endpoint.path);  //se c'è lo / viene richiamata la homepage se ce /favicon.ico è l'immagine quindi basta fare uno switch
	response.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});	
	
	switch (endpoint.pathname){//path ci da tutti i parametri dopo/ --- invece pathname dal primo / al ?
		case "/":
			var homepage = moduloFS.readFileSync("sito/homepage.html");
			response.write(homepage);  //moduloFS.readFileSync("sito/pagina.html")
			
			console.log("Homepage!");
			response.end();
		break;
		case "/visualizza":
			
				var fileContents = moduloFS.readFileSync('Rubrica.json', 'utf8')
				var user = JSON.parse(fileContents)
				response.write(user.toString())
			/*moduloFS.readFileSync("Rubrica.txt","utf-8").split("\n").forEach(function(riga){
				response.write(riga+"<br>");
				const user = JSON.parse(data)
				response.write(user)
				
			});*/
			console.log("Ho Visualizzato!");
			response.end();
		break;
		
		case "/carica":
			
			
			if(request.method=="get"){ //se i parametri sono passati in get
				var varDato2 = endpoint.query.nome + ";" + endpoint.query.cognome + ";" + endpoint.query.telefono + "\n" //-->serve per passare i parametri in get
				moduloFS.appendFile("Rubrica.txt", "\n"+varDato2 ,function(errore) {
					if(errore)	console.log("Errore!");
				});
				response.end();
				
			}else{
				var concatenaDati="";
				request.on("data",function(mieiparametri){//parametri : evento - callBack     data: recupera tutti i dati in post da quasto evento
					concatenaDati+=mieiparametri;
				});
				request.on("end",function(){
					response.write(concatenaDati);
					response.write("<br>");
					var mieiParametri = moduloQS.parse(concatenaDati);
					response.write(mieiParametri["cognome"]);
					var varDato=mieiParametri["cognome"] + ";" + mieiParametri["nome"] + ";" + mieiParametri["telefono"];
					console.log(varDato);

					moduloFS.appendFile("Rubrica.txt", "\n"+varDato ,function(errore) {
						if(errore)	console.log("Errore!");
					});

					response.end();

					
				});
				request.on("error", function(){
					response.write("errore");
					response.end();
				});

				
				
			}
				
			
			
			console.log("Ho Letto la carica!");
		break;
		
		case "/elimina":
			var listaParoleElimina = [];
			if(request.method=="GET"){ //se i parametri sono passati in get
				var varDatoElimina = endpoint.query.cognome 
				console.log("parola passata --> "+varDatoElimina)

				//carico il file in un array
				moduloFS.readFileSync("Rubrica.txt","utf-8").split("\n").forEach(function(riga){
					riga.split(";").forEach(function(parola){
						listaParoleElimina.push(parola);
					})
				});

			//trovo la posizione del cognome
			var PosizioneParola=listaParoleElimina.indexOf(varDatoElimina);
			if (PosizioneParola!=-1) {
				console.log("Posizione Cognome --> "+PosizioneParola)
				listaParoleElimina.splice(PosizioneParola,3);
				console.log(listaParoleElimina.toString())
				moduloFS.writeFileSync("Rubrica.txt",listaParoleElimina);
				listaParoleElimina.join()
				console.log(listaParoleElimina.join().toString())
			}else{
				console.log("Cognome Non Trovato")
			}
				

				response.end();
			
			}

			
			
			
			console.log("Ho Letto la elimina!");
			response.end();
		break;
		
		
		case "/caricaform":
			
			var paginaHtml = moduloFS.readFileSync('sito/form_carica.html');
			response.write(paginaHtml);
			response.end();
		break;

		case "/formelimina":
			
			var paginaHtml1 = moduloFS.readFileSync('sito/form_elimina.html');
		
			response.write(paginaHtml1);
			response.end();
		break;



		case "/ordina":
			var listaRighe = [];
			moduloFS.readFileSync("Rubrica.txt","utf-8").split("\n").forEach(function(riga){
				listaRighe.push(riga);	
			});

			moduloFS.writeFileSync("Rubrica.txt","Nome;Cognome;Telefono");
			listaRighe.sort();
			listaRighe.join().split(',').forEach(function(nomeCognomeTelefono){
				moduloFS.appendFileSync("Rubrica.txt",'\n'+nomeCognomeTelefono,function(errore) {
					if(errore)	console.log("Errore!");
				});
				console.log(nomeCognomeTelefono);
			})
			
			
			response.end();
			
		break;
			
	}
	
	
	
		
		
		
	
	
}).listen(1500); //server che resta in ascolto



console.log("Il server del fileSystem è in esecuzione");


