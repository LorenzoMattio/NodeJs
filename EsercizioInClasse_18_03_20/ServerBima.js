/**
 * http://usejsdoc.org/
 */


var http=require("http");

var express=require("express");
var app=express();


var server=http.createServer(app);

var socket=require("socket.io")(server);

app.use(express.static(__dirname + '/node_modules'));

app.get("/",function(req,resp){
	
	resp.sendFile(__dirname + "/html/index.html");
});

socket.on("connection",function(client){
	var nomeRoom="";
	console.log("Utent collegato");
	
	client.on("room",function(data){
		nomeRoom=data;
		client.join(data);
		console.log(data);
	});
	client.on("msg",function(data1,data2,tipo){
		num1=parseInt(data1);
		num2=parseInt(data2);
		console.log(tipo);
		switch(tipo){
		case "add":
			ris=num1+num2;
			break;
		case "sott":
			if(num1>num2){
				ris=num1-num2;
			}else{
				ris=num2-num1;
			}
			break;
		case "molt":
			ris=num1*num2;
			break;
		case "div":
			if(num2==0){
				ris="Non Calcolabile!";
			}else{
				ris=num1/num2;
			}
			break;
		}
		
		console.log(nomeRoom);
		socket.in(nomeRoom).emit('msg', ris);
	});
});



server.listen(3104);
