const mimelite = require('mime/lite');
const http = require('http');
const ws = require('ws');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json'));

const express = require('express');
const app = express();
app.use((req,res,next)=>{
	log(`http://${req.hostname}${req.url}`,'http');
	next();
},express.static('public'));
app.enable('etag');
const server = http.createServer(app);
const wss = new ws.Server({noServer:true});
server.on('upgrade',(req,soc,head)=>{
	wss.handleUpgrade(req,soc,head,ws=>{
		wss.emit('connection',ws,req);
	})
});
server.listen(config.port);

const dateformat = require('dateformat');
dateformat.masks.default = 'UTC:dd-mm-yyyy HH:MM:ss'
function log(msg,type){
	var text = `[${dateformat(new Date())}] ${type}: ${msg}`;
	if(config.log.console[type])console.log(text);
	if(config.log.file[type])fs.appendFile(config.log.file.path,text+'\n',()=>{});
}

var clients = []
wss.on('connection',con=>{
	log('New Connection','ws');
	con.send(JSON.stringify({
		type:"welcome",
		data:[...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
	}));

	con.on('message',msg=>{
		con.send(msg)
	});
});