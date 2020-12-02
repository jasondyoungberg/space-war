const mimelite = require('mime/lite');
const http = require('http');
const ws = require('ws');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json'));
const crypto = require('crypto');

//create server
const express = require('express');
const app = express();
app.use((req,res,next)=>{//log request
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
function log(msg,type){//log message
	var text = `[${dateformat(new Date())}] ${type}: ${msg}`;
	if(config.log.console[type])console.log(text);
	if(config.log.file[type])fs.appendFile(config.log.file.path,text+'\n',()=>{});
}

var clients = []
wss.on('connection',con=>{//handle websocket
	function send(msg,type,data){
		con.send(JSON.stringify({
			id:msg.id,
			time:Date.now(),
			type:type,
			data:data
		}))
	}
	con.on('message',data=>{
		log(data,'ws')
		try{
			var msg = JSON.parse(data);
			if(msg.type=='token'){//Client requesting token
				crypto.randomBytes(24,(err,buf)=>{
					if(err)log(err,'err');
					var token = buf.toString('base64');
					log(`{${token}} New connection`,'ws');
					send(msg,'token',token);
				});
				return;
			}
			if(msg.type=='ping'){//Client requesting ping
				send(msg,'ping');
				return;
			}
			if(msg.type=='gamestate'){//Client requesting gamestate
				//TODO
			}
		}catch(err){
			log(err,'err');
			con.send('{"type":"err"}');
		}
	});
});