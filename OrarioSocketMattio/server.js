var net = require("net");
var fs = require('fs');

var listaSocket = []; 		// Insieme di tutti i canali aperti
var id = 0;	
var accesso = true;
var orario = new Date();


var server=net.createServer(function(socket){
	
	socket.write("Nome client: ");
	
	socket.on("data", function(data){
		if(socket.id === undefined){
			
			socket.id = id;
			listaSocket.push(socket); 
			id++;
			accesso = false;
			
		}else{
			if(socket.name === undefined){
				
				var tmpNome = data.toString();
				socket.name = tmpNome;
				
			}else{
				
				for(let i = 0; i<listaSocket.length; i++){
					if(listaSocket[i].id != socket.id){
						listaSocket[i].write(socket.name.replace(/(\n|\r)+$/, '')+": " + orario.getHours() + ": " + orario.getMinutes() + ": " + orario.getSeconds());
					}
				}
				
			}
		}

	});

	socket.on("end",function(){
		console.log("Connessione chiusa: " + this.remoteAddress + " - " + this.remotePort);
	});
	
}).listen(1333);