const mimelite = require('mime/lite');
const http = require('http');
const ws = require('ws');
const fs = require('fs');
const dateformat = require('dateformat');

dateformat.masks.default = 'UTC:dd-mm-yyyy HH:MM:ss.l'
const config = JSON.parse(fs.readFileSync('config.json'));


function log(msg){
	console.log(`[${dateformat(new Date())}] ${msg}`)
}

//webserver
var http_server = http.createServer((req,res)=>{
	if(config.log.http)log(`http://${req.headers.host}${req.url}`);
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
});

http_server.listen(config.port);

ws_server = new ws.Server({noServer:true});

var clients = []

ws_server.on('connection',con=>{
	if(config.log.ws)log('connected');
	con.send(JSON.stringify({
		type:"welcome",
		data:[...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
	}));

	con.on('message',msg=>{
		con.send(msg)
	});
});

http_server.on('upgrade',(req,socket,head)=>{
	ws_server.handleUpgrade(req,socket,head,ws=>{
		ws_server.emit('connection',ws,req);
	})
});