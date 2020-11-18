const mimelite = require('mime/lite');
const http = require('http');
const ws = require('ws');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json'));

const express = require('express');
const app = express();
app.use(express.static('public'));
const server = http.createServer(app);
const wss = new ws.Server({noServer:true});
server.listen(config.port);

const dateformat = require('dateformat');
dateformat.masks.default = 'UTC:dd-mm-yyyy HH:MM:ss.l'
function log(msg){
	console.log(`[${dateformat(new Date())}] ${msg}`)
}

var clients = []
wss.on('connection',con=>{
	if(config.log.ws)log('Connection from ');
	con.send(JSON.stringify({
		type:"welcome",
		data:[...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
	}));

	con.on('message',msg=>{
		con.send(msg)
	});
});

server.on('upgrade',(req,socket,head)=>{
	wss.handleUpgrade(req,socket,head,ws=>{
		wss.emit('connection',ws,req);
	})
});