var fs = require('fs'); //modulo fs
var http = require("http"); //modulo http
var url = require("url");
var qs = require('querystring');

var mieiDati="";

var server = http.createServer(function(request,response){
//	console.log("Sto per scrivere");
	var endpoint = url.parse(request.url, true);
	var query = endpoint.query;

	
	//	console.log(endpoint.path + " "endpoint query.cognome);
	/*fs.writeFile("Rubrica.txt", "Mario; Rossi; 3216549871;", function(errore){
		if(errore){
			console.log("ERRORE SCRITTURA");
		}
		//console.log("Sono nella callback")
		fs.readFile("Rubrica.txt", "UTF-8", function(errore, data) {
			if(errore){
				console.log("ERRORE LETTURA");
			}
			mieiDati = data;
			
		})
	});*/

	switch(endpoint.pathname){
		case "/":
			var homePage = "<html> <body> <a href = '\visualizza'> visualizza </a> <br> <a href = '\caricaForm'> inserisci/cancella dato</a> <br>  <a href = '\ordina'> ordina </a> <br> </body> </html>"
			response.write(homePage);
			response.end();
		break;
		case "/carica":
			leggiPostEGet(request,aggiungiAFile, fs);
			
			response.end();
			break;
		case "/visualizza":
			var mieiDati = fs.readFileSync("Rubrica.txt","utf-8");
			fs.readFileSync("Rubrica.txt", "UTF-8");
			response.write(mieiDati);
			
			response.end();
			break;
		case "/elimina":
			leggiPostEGet(request, cancellaDaFile, fs);
			
			response.end();
			break;
		case "/caricaForm":
			var fileHtml = fs.readFileSync("form_carica.html");
			response.write(fileHtml);
			
			response.end();
			break;
		case "/cancellaForm":
			var fileHtml = fs.readFileSync("form_carica.html");
			response.write(fileHtml);
			
			response.end();
			break;
		case "/ordina":
			ordinaFile(fs);
			response.end();
			break;
		case "/cerca":
			if(query.cognome === undefined){
				console.log("Cognome non inseriti\n");
			}else{
				
				cerca(query.cognome, function(){
					if(dati === undefined){
						console.log("Cognome non trovato");
					}else{
						response.write(dati[0] + "  " + dati[1] + " " + dati[2]);
					}
				});
				
				//var dati = cerca(query.cognome);
			}
			response.end();
			break;
	}

	//fs.writeFileSync("Rubrica.txt","Mario Rossi 017567382"); <-- è sincrono
	//console.log("Ho scritto");
}).listen(1392);


function leggiPostEGet(request, funz, fs){
	if(request.method == "GET"){
		if(query.cognome === undefined || query.nome === undefined || query.tel === undefined){
			console.log("Dati non inseriti\n");
		}else{
			return query.cognome+"; "+query.nome+"; "+query.tel+";";
		}
	}else{
		var concatenaDati = "";
		console.log(concatenaDati);
		request.on("data", function(parametri){ //parametri contiene nome, cognome e telefono passati con POST
			concatenaDati+=parametri;
		});
		request.on("end", function(){
			var parametri = qs.parse(concatenaDati);
			varDato = parametri['nome']+"; "+parametri['cognome']+"; "+parametri['tel']+";";
			
			console.log(varDato);
			funz(fs, varDato);
			
		});
		request.on("errore", function(){
			console.log("ERRORE");
		});
	}
}

function aggiungiAFile(fs, dato){
	fs.appendFile("Rubrica.txt", "\n"+dato,function(errore){
		if(errore){
			console.log("Errore "+errore);
		}
	});
}

function cancellaDaFile(fs, dato){
	var stringaFinale = "";
	
	var lineReader = require('readline').createInterface({
	  input: require('fs').createReadStream('Rubrica.txt')
	});
	
	lineReader.on('line', function (line) {
		if(dato != line){
			stringaFinale+=line+"\n";

		}
	});
	
	lineReader.on('close', function (line) {
		stringaFinale = stringaFinale.slice(0, -1); //rimuovo ultimo \n
		fs.writeFile("Rubrica.txt", stringaFinale, function(errore){
			if(errore){
				console.log("ERRORE SCRITTURA");
			}
		});
	});
	
}

function ordinaFile(fs){
	var arrayRubrica=[];
	var i = 0;
	var stringaFinale = "";
	
	var lineReader = require('readline').createInterface({
		  input: require('fs').createReadStream('Rubrica.txt')
		});
	
	lineReader.on('line', function (line) {
		arrayRubrica[i] = line;
		i++;
	});
	
	lineReader.on('close', function (line) {
		arrayRubrica.sort(); //ordinamento array
		
		arrayRubrica.forEach(elemento => {
			stringaFinale+=elemento + "\n";
		});
		
		stringaFinale = stringaFinale.slice(0, -1); //rimuovo ultimo \n
		
		fs.writeFile("Rubrica.txt", stringaFinale, function(errore){
			if(errore){
				console.log("ERRORE SCRITTURA");
			}
		});
	});
}

function cerca(cognome){
	var arrayRubrica = [];
	var i = 0;

	var lineReader = require('readline').createInterface({
		  input: require('fs').createReadStream('Rubrica.txt')
		});

	lineReader.on('line', function (line) {
		line.split(";").forEach(elemento =>{
			elemento = elemento.replace(" ", "");
			arrayRubrica[i] = elemento;
			i++;
		});
	});

	lineReader.on('close', function (line) {
		let indice = arrayRubrica.indexOf(cognome);
		return arrayRubrica.slice(indice - 1, indice + 2);
	});
	
}