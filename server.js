const ws = require('ws');
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

ws_server = new ws.Server({noServer:true});

var clients = []

ws_server.on('connection',con=>{
	console.log('ws');

	con.send(JSON.stringify({
		type:"welcome",
		data:[...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
	}));

	con.on('message',msg=>{
		console.log('message')
		con.send(msg)
	});
});

http_server.on('upgrade',(req,socket,head)=>{
	ws_server.handleUpgrade(req,socket,head,ws=>{
		ws_server.emit('connection',ws,req);
	})
});