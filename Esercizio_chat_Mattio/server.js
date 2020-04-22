var net =require("net");
var controllo=false;
var fs = require('fs');
var server=net.createServer(function(mioSocket){

	mioSocket.on("data",function(data){
		response.write(data + "<br>");
	});

	mioSocket.on("end",function(){
		console.log("Connessione chiusa: " + this.remoteAddress + " - "+ this.remotePort);
	});
	
}).listen(1333);