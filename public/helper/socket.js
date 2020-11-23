export var con;
export var connected = false;
var queue = [];

export function connect(){//connect to server
	con = new WebSocket('ws://'+window.location.hostname+':'+window.location.port,'space-war');
	con.onopen=evt=>{
		connected = true;
		queue.push({
			time:Date.now(),
			type:'open',
			data:evt
		});
	};
	con.onclose=evt=>{
		connected = false;
		queue.push({
			time:Date.now(),
			type:'close',
			data:evt
		});
	};
	con.onerror=evt=>{
		queue.push({
			time:Date.now(),
			type:'err',
			data:evt
		});
	};
	con.onmessage=evt=>{
		queue.push({type:'message',data:JSON.parse(evt.data)});
	};
	return con;
}
export function write(type,data=''){
	con.send(JSON.stringify({
		time:Date.now(),
		type:type,
		data:data
	}));
}
export function read(callback){
	//callback = ele=>{}
	old_queue = queue
	queue = []
	if(callback){
		for(var i=0;i<old_queue.length;i++){
			ele = old_queue.splice(i)
			if(callback(ele)=='skip'){queue.push(ele)};
		}
	}else{
		return old_queue;
	}
}
export function requeue(n){queue.push(n)}