var net=require("net");
var stdin= process.openStdin();
var fs=require("fs");

var client=net.connect(1333,"127.0.0.1",function(){
	console.log("CLIENT UNO\r\n");
});

stdin.addListener("data", function(msg) { 
	if (msg.toString()=="end\r\n")
		client.end();
	else
		client.write("Client1 --> " + msg);
	});


client.on('close', function(e) {
        client.connect(1333,"127.0.0.1");
});