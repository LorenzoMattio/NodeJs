/**
 * http://usejsdoc.org/
 */

var http = require("http");
var express = require("express");
var app = express();

var server = http.createServer(app);

var io = require("socket.io")(server);

server.listen(3000);

app.use(express.static(__dirname + '/node_modules'));

app.get("/", function(req,res){
	res.sendFile(__dirname + "/html/index.html");
});

io.on("connection", function (socket){
	console.log("ACCESSO UTENTE");
	for(i=0; i<10; i++){
		io.emit("msg1","Ciao come stau?"+i);
	}
	io.emit("msg2","Domani ci sei?");
	socket.on("miomessaggio", function(varia){
		console.log(varia);
	});
});

