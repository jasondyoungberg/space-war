import * as THREE from '/lib/three.js';
import * as Model from '/helper/model.js';

var sky,player,light;
const size = 5;
export var mode;
export function init(){//When mode is switched to singleplayer
	mode = 'single';
	{//basic elements
		sky = Model.sky(1000);
		light = new THREE.PointLight(0xffffff,2);
	}
	{//add all objects to scene
		scene.add(sky);
		scene.add(light);
		//scene.add(player.ship);
	}
	{//Create overlay
		hud.innerHTML = '';
	}
}
export function loop(){//Ran every frame

}
export function exit(){//When mode is switched from singleplayer

}
export var event = {//Triggered for events
	resize:ev=>{},
	keydown:ev=>{},
	keyup:ev=>{},
	mousedown:ev=>{},
	mouseup:ev=>{},
}
export var button = {}
export function update(){
	{//remove old models
		scene.remove(selected);
		for(var i=-size;i<=size;i++){
			scene.remove(type.models[i]);
			scene.remove(color.models[i]);
		}
	}
	{//set new models
		selected = Model.ship(color.selected,type.selected);
		for(var i=-size;i<=size;i++){
			type.models[i]=Model.ship(color.selected,mod(type.selected+i,13));
			color.models[i]=Model.ship(mod(color.selected+i,8),type.selected);
		}
	}
	{//add new models
		scene.add(selected);
		for(var i=-size;i<=size;i++){
			scene.add(type.models[i]);
			scene.add(color.models[i]);
		}
	}
	{//update specs
		dom.name.innerHTML = specs[type.selected].name;
		dom.speed.bar.style.width = specs[type.selected].speed+'%';
		dom.speed.value.innerHTML = specs[type.selected].speed;
		dom.attack.bar.style.width = specs[type.selected].attack+'%';
		dom.attack.value.innerHTML = specs[type.selected].attack;
		dom.health.bar.style.width = specs[type.selected].health+'%';
		dom.health.value.innerHTML = specs[type.selected].health;
		dom.shield.bar.style.width = specs[type.selected].shield+'%';
		dom.shield.value.innerHTML = specs[type.selected].shield;
		dom.regen.bar.style.width = specs[type.selected].regen+'%';
		dom.regen.value.innerHTML = specs[type.selected].regen;
		dom.battery.bar.style.width = specs[type.selected].battery+'%';
		dom.battery.value.innerHTML = specs[type.selected].battery;
		dom.reactor.bar.style.width = specs[type.selected].reactor+'%';
		dom.reactor.value.innerHTML = specs[type.selected].reactor;
	}
}