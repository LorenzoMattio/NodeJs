var http = require("http");
var express = require("express");
var app = express();

var server = http.createServer(app);
var socket = require("socket.io")(server);
app.use(express.static(__dirname + '/node_modules'));

app.get("/",function(req,resp){
	
	resp.sendFile(__dirname + "/index.html");
});

socket.on("connection",function(client){
	var nomeRoom = "";
	console.log("Utente collegato");
	
	client.on("room",function(data){
		nomeRoom = data;
		client.join(data);
		console.log(data);
	});
	client.on("msg",function(data1,data2,scelta){
		n1 = parseInt(data1);
		n2 = parseInt(data2);
		console.log(scelta);
		switch(scelta){
		case "addizione":
			risultato=n1+n2;
			break;
			
		case "sottrazione":
			if(n1>n2){
				risultato = n1 - n2;
			}else{
				risultato = n2 - n1;
			}
			break;
			
		case "moltiplicazione":
			risultato = n1 * n2;
			break;
			
		case "divisione":
			if(n2 == 0){
				risultato = "Errore";
			}else{
				risultato = n1 / n2;
			}
			break;
		}
		
		console.log(nomeRoom);
		socket.in(nomeRoom).emit('msg', risultato);
	});
});



server.listen(1990);
