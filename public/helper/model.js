import * as THREE from 'lib/three.js'
import {OBJLoader} from 'lib/OBJLoader.js'

//loaders
const obj_loader = new OBJLoader();
const txt_loader = new THREE.TextureLoader();

//Load all models
var ships = [];
var cnt=0;
export var ready = false;
for(var i=0;i<13;i++){
	let j=i;
	obj_loader.load(
		`models/ship${i}.obj`,
		obj=>{
			//console.log(obj)
			ships[j]=obj;
			cnt++
		},
		x=>{},console.error
	);
}

var missile_model;
obj_loader.load(
	'models/missile.obj',
	obj=>{
		missile_model=obj;
		cnt++
	},
	x=>{},console.error
);

//Load all colors
const emissive = txt_loader.load('textures/emissive.png');
const metallic = txt_loader.load('textures/metallic.png');
const normal = txt_loader.load('textures/normal.png');
const roughness = txt_loader.load('textures/roughness.png');
var colors = []
for(var i=0;i<8;i++){
	colors[i] = new THREE.MeshPhongMaterial({})
	
	colors[i].map=txt_loader.load(`textures/color${i}.png`);
	colors[i].emissiveMap=emissive;
	colors[i].emissiveIntensity=0.02;
	colors[i].emissive={r:255,g:255,b:255};
	colors[i].normalMap=normal;
	colors[i].roughnessMap=roughness;
	colors[i].metalnessMap=metallic;
}

//Load other maps

const missile_txt = txt_loader.load('textures/missile.jpg');
const missile_normal = txt_loader.load('textures/missile-normal.jpg');
const stars = txt_loader.load('textures/space.png');

//Generate ship
export function ship(color=0,type=0){
	//console.log(`ship(${color},${model})`)
	var object = ships[type].clone();
	object.traverse(child=>{
		if(child.isMesh){
			object.children[0].material=colors[color];
		};
	});
	return object;
}

export function missile(){
	var object = missile_model;
	object.traverse(child=>{
		if(child.isMesh){
			console.log(child.material)
			for(var i=0;i<9;i++){
				child.material[i].map=missile_txt;
				child.material[i].normalMap=missile_normal;
			}
		};
	});
	return object;
}

export function sky(size=1000,detail=32){
	return new THREE.Mesh(new THREE.SphereGeometry(size,detail,detail),new THREE.MeshBasicMaterial({
		map:stars,
		side:THREE.BackSide
	}));
}

var waitForReady = setInterval(()=>{
	if(cnt==14){ready = true;clearInterval(waitForReady)};
});