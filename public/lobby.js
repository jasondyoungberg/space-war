import * as THREE from './lib/three.js';
import * as Model from './helper/model.js';

export var mode;
export function init(){//When mode is switched to menu
	mode = 'lobby';
}
export function loop(){//Ran every frame

}
export function exit(){//When mode is switched from menu
	scene.remove(sky);
	scene.remove(light);
	scene.remove(selected);
	for(var i=-size;i<=size;i++){
		scene.remove(type.models[i]);
		scene.remove(color.models[i]);
	}
}
export var event = {//Triggered for events
	resize:ev=>{},
	keydown:ev=>{},
	keyup:ev=>{},
	mousedown:ev=>{},
	mouseup:ev=>{},
}