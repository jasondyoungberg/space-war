import * as THREE from '/lib/three.js';
import * as Model from '/helper/model.js';

var sky,selected,light,type,color,rot,dom;
const size = 5;
export var mode;
export function init(){//When mode is switched to menu
	mode = 'menu';rot=0;
	{//basic elements
		sky = Model.sky(1000);
		light = new THREE.PointLight(0xffffff,2);
		//light = new THREE.AmbientLight(0xffffff,1);
	}
	{//initialize options for ship type and color
		type = {
			models:[],
			selected:0,
			position:0
		}
		color = {
			models:[],
			selected:0,
			position:0
		}
		for(var i=-size;i<=size;i++){
			type.models[i]=Model.ship(color.selected,mod(type.selected+i,13));
			color.models[i]=Model.ship(mod(color.selected+i,8),type.selected);
		}
		selected = Model.ship(0,0);
	}
	{//set position and rotation of all objects
		camera.position.set(0,0,0);
		camera.rotation.set(0,0,0);
	}
	{//add all objects to scene
		scene.add(sky);
		scene.add(light);		
		scene.add(selected);
		for(var i=-size;i<=size;i++){
			scene.add(type.models[i]);
			scene.add(color.models[i]);
		}
	}
	{//Create overlay
		hud.innerHTML = '<style>p{margin:0;}div#hud{width:calc(100vw - 4vh);height:96vh;padding:2vh;display:grid;grid-template-columns:15vh 37vh 1fr 37vh 15vh;grid-template-rows:52vh 2vh 21vh 21vh;grid-template-areas:"sp sp . ct ct" ". . . . ." "tl . . . tr" "bl . . . br";}img{position:fixed;width:15vh;height:21vh;cursor:pointer;transition:0.3s;}img.top:hover{opacity:0;}div#specs{border-radius:7.5vh;border:0.75vh solid #fff;background-color:#000;font-size:3vh;margin:0;}div.spec{position:relative;border:0.5vh solid #fff;border-radius:2.125vh;margin:0.5vh;height:4.25vh;overflow:hidden;}div.bar{width:0%;height:4.25vh;background-color:#039;transition:0.5s;}p{display:inline-block;position:absolute;height:4.25vh;line-height:4.25vh;}p.title{left:0.5vh;}p.value{right:0.5vh;}div#controls{display:grid;grid-row-gap:2vh;grid-template-rows:16vh 16vh 16vh;}div#status{line-height:16vh;font-size:5vh;text-align:center;}div.btn{background-color:#000;border:0.75vh solid #fff;border-radius:7.5vh;text-align:center;line-height:14.5vh;transition:0.3s;color:#09f;font-size:7vh;font-weight:bolder;cursor:pointer;}div.btn:hover{background-color:#039;color:#000;}div.disabled{background-color:#333;color:#ccc;cursor:not-allowed;}div.disabled:hover{background-color:#333;color:#ccc;}</style><div style="grid-area:sp;padding:1vh;" id="specs"><h1 id="name" style="height:6.25vh;line-height:6.25vh;font-size:6vh;margin:0;text-align:center;"></h1><div class="spec" id="speed"><p class="title">Speed</p><p class="value" id="speed-val"></p><div class="bar" id="speed-bar"></div></div><div class="spec" id="attack"><p class="title">Attack</p><p class="value" id="attack-val"></p><div class="bar" id="attack-bar"></div></div><div class="spec" id="health"><p class="title">Health</p><p class="value" id="health-val"></p><div class="bar" id="health-bar"></div></div><div class="spec" id="shield"><p class="title">Shield</p><p class="value" id="shield-val"></p><div class="bar" id="shield-bar"></div></div><div class="spec" id="regen"><p class="title">Regen</p><p class="value" id="regen-val"></p><div class="bar" id="regen-bar"></div></div><div class="spec" id="battery"><p class="title">Battery</p><p class="value" id="battery-val"></p><div class="bar" id="battery-bar"></div></div><div class="spec" id="reactor"><p class="title">Reactor</p><p class="value" id="reactor-val"></p><div class="bar" id="reactor-bar"></div></div></div><div style="grid-area:ct" id="controls"><div id="status">Connecting...</div><div class="btn disabled" onclick="Menu.button.ready()">Ready</div><div class="btn" onclick="Menu.button.single()">Singleplayer</div></div><div style="grid-area:tl"><img src="/img/menu/button-tld.svg"><img src="/img/menu/button-tlu.svg" class="top" onclick="Menu.button.tl()"></div><div style="grid-area:tr"><img src="/img/menu/button-trd.svg"><img src="/img/menu/button-tru.svg" class="top" onclick="Menu.button.tr()"></div><div style="grid-area:bl"><img src="/img/menu/button-bld.svg"><img src="/img/menu/button-blu.svg" class="top" onclick="Menu.button.bl()"></div><div style="grid-area:br"><img src="/img/menu/button-brd.svg"><img src="/img/menu/button-bru.svg" class="top" onclick="Menu.button.br()"></div>';
		dom = {
			"name":document.getElementById('name'),
			"speed":{
				value:document.getElementById('speed-val'),
				bar:document.getElementById('speed-bar')
			},
			"attack":{
				value:document.getElementById('attack-val'),
				bar:document.getElementById('attack-bar')
			},
			"health":{
				value:document.getElementById('health-val'),
				bar:document.getElementById('health-bar')
			},
			"shield":{
				value:document.getElementById('shield-val'),
				bar:document.getElementById('shield-bar')
			},
			"regen":{
				value:document.getElementById('regen-val'),
				bar:document.getElementById('regen-bar')
			},
			"battery":{
				value:document.getElementById('battery-val'),
				bar:document.getElementById('battery-bar')
			},
			"reactor":{
				value:document.getElementById('reactor-val'),
				bar:document.getElementById('reactor-bar')
			}
		}
	}
	{//initialize specs
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
export function loop(){//Ran every frame
	rot+=rad(0.5)
	color.position*=0.9;
	type.position*=0.9;

	selected.rotation.set(rad(45),rot,0);
	selected.position.set(0,7,-20)

	for(var i=-size;i<=size;i++){
		type.models[i].rotation.set(rad(30),rot,0);
		type.models[i].position.set(20*(i+type.position),-10,-50);

		color.models[i].rotation.set(rad(15),rot,0);
		color.models[i].position.set(20*(i+color.position),-25,-50);
	}

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
	keydown:ev=>{
		if(ev.key=='upArrow')type.selected++;
		if(ev.key=='downArrow')type.selected--;
		if(ev.key=='leftArrow')color.selected--;
		if(ev.key=='rightArrow')color.selected++;
	},
	keyup:ev=>{},
	mousedown:ev=>{},
	mouseup:ev=>{},
}
export var button = {
	tl:()=>{
		type.selected = mod(type.selected-1,13);
		type.position--
		update();
	},
	tr:()=>{
		type.selected = mod(type.selected+1,13);
		type.position++
		update();
	},
	bl:()=>{
		color.selected = mod(color.selected-1,8);
		color.position--
		update();
	},
	br:()=>{
		color.selected = mod(color.selected+1,8);
		color.position++
		update();
	},
	ready:()=>{

	},
	single:()=>{
		mode = 'single';
	}
}
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