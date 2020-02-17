var http = require("http");
var fs = require("fs");
var mieiDati = "";
var url = require("url");
var qs = require("querystring");

var server = http.createServer(function(request, response){
	var endpoint = url.parse(request.url,true);
	console.log("\nURL fuori switch --> "+ endpoint.path);
	switch (endpoint.pathname){
	case "/visualizza":
		mieiDati = fs.readFileSync("Rubrica.txt","utf-8");
		response.write(mieiDati);
		response.end();
		break;
		
		
	case "/carica":
			var str = "";
			if (request.method == "GET"){
//				Metodo post
				str = endpoint.query.nome + ' ' + endpoint.query.cognome + ' ' + endpoint.query.telefono + '\n';
				fs.appendFileSync('Rubrica.txt', str);
				response.write("<b>Caricamento effettuato! </b> <a href='/'>Ritorna alla pagina iniziale! </a>");
				response.end();
			}else{
				var concatenaDati = "";
				request.on("data", function (mieiParametri){
					concatenaDati += mieiParametri;
				});
				request.on("end",function(){
					var mieiParametri = qs.parse(concatenaDati);
					str = mieiParametri["nome"] + ' ' + mieiParametri["cognome"] + ' ' + mieiParametri["telefono"] + '\n';
					fs.appendFileSync('Rubrica.txt', str);
					response.write("<b>Caricamento effettuato! </b> <a href='/'>Ritorna alla pagina iniziale! </a>");
					response.end();
				});
				request.on("error", function (){
					
				});
			}
			
		break;
		
	case "/caricaform":
			var form_file = fs.readFileSync("form_carica.html");
			response.write(form_file);
			response.end();
		break;
		
	case "/elimina":
		var contatti = [];
		var i = 1;
		var str = "";
		var tmp = fs.readFileSync("Rubrica.txt","utf-8");
		contatti = tmp.split("\n")
		var mieiParametri = qs.parse(concatenaDati);
		for(var i=0; i < contatti.length;i++){
			var anagrafica = contatti[i].split(" ");
			if (anagrafica[1] == endpoint.query.cognome){
				contatti[i] = "";
			}else{
				str += contatti[i] + '\n';
			}
		}
		fs.unlinkSync('Rubrica.txt');
		
		fs.writeFileSync('Rubrica.txt', str);
		
		response.write("<b>Eliminazione effettuata! </b> <a href='/'>Ritorna alla pagina iniziale! </a>");
		
		response.end();
	
		break;
		
	case "/eliminaform":
		var form_file = fs.readFileSync("form_elimina.html");
		response.write(form_file);
		response.end();
	break;
		
	case "/ordina":
		var contatti = [];
		var str = "";
		var file = fs.readFileSync("Rubrica.txt","utf-8");
		contatti = file.split("\n");
		contatti.sort();
		for(var i=0; i < contatti.length;i++){
			if (contatti[i] != '\n'){
				str += contatti[i] + '\n';
			}
		}
		fs.unlinkSync('Rubrica.txt');
		
		fs.writeFileSync('Rubrica.txt', str);
		response.write("<b> Ordinazione effettuata! </b> <a href='/'>Ritorna alla pagina iniziale! </a>");
		response.end();
	
		break;

	case "/":
		var homePage = "<html><body> <h1><a href='/visualizza'>Visualizza</a></h1> <h1><a href='/ordina'>Ordina rubrica</a></h1> <h1><a href='/eliminaform'>Elimina</a></h1> <h1><a href='/caricaform'>Carica</a></h1></body></html>"
		response.write(homePage);
		response.end();
		break;
	}
}).listen(1391);