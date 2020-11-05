export var con;
export var connected = false;
var queue = []

export function connect(){//connect to server
	con = new WebSocket('ws://'+window.location.hostname+':'+window.location.port,'space-war');
	con.onopen=evt=>{
		connected = true;
		queue.push({type:'connected',data:evt});
	};
	con.onclose=evt=>{
		connected = false;
		queue.push({type:'disconnected',data:evt});
	};
	con.onerror=evt=>{
		queue.push({type:'error',data:evt});
	};
	con.onmessage=evt=>{
		console.log(evt);
		queue.push({type:'data',data:JSON.parse(evt.data)});
	};
}

export function send(msg){con.send(JSON.stringify(msg))}
export function read(){var output=queue;queue=[];return output;}