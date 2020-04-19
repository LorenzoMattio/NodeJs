/**
 * http://usejsdoc.org/
 */

var net = require("net");
var server = net.createServer(function (mioSocket){
	console.log("Client connesso!");
	
}).listen(1335,"127.0.0.1");