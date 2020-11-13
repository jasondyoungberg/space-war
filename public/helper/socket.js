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
		queue.push({type:'message',data:JSON.parse(evt.data)});
	};
	return con;
}

export function write(msg){
	con.send(JSON.stringify(msg));
}
export function read(){
	console.log('read')
	var output=queue;
	queue=[];
	return output;
}