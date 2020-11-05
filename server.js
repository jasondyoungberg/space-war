const ws = require('websocket');
const mimelite = require('mime/lite');
const http = require('http');
const fs = require('fs');

//webserver
var http_server = http.createServer((req,res)=>{
	//console.log(req.url)
	var url = 'public/'+req.url.replace(/^\/|\/$/g,'');
	if(url.split('.').length==1)url+='index.html';
	fs.readFile(url,(err,data)=>{
		if(err){
			res.writeHead(404);
			res.end();
		}else{
			res.writeHead(200,{'Content-Type': mimelite.getType(url.split('.')[1])});
			res.write(data);
			res.end();
		}
	});
})

http_server.listen(80);

ws_server = new ws.server({
	httpServer:http_server,
	autoAcceptConnections:true
});

var clients = []

ws_server.on('request',req=>{
	console.log(req.origin);
	var con = req.accept('space-war',req.origin);
	console.log('connected');

	con.on('message',msg=>{
		console.log('mess')
		if(msg.type==='utf8'){
			console.log(msg.utf8Data);
			con.sendUTF(msg.utf8Data);
		}
	});

	con.on('close',(reason,desc)=>{
		console.log('disconnected')
	});
});