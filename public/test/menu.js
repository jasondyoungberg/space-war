import * as THREE from '/lib/three.js'
import * as model from '/helper/model.js'

//Statistics panel
var stats = new Stats();
stats.addPanel(new Stats.Panel('','#0000','#0000'))
stats.showPanel(3);
document.body.appendChild(stats.domElement);

const pi = Math.PI;

function deg(rad){return(rad*180/pi)}
function rad(deg){return(deg*pi/180)}

var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setClearColor(0,1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,0.1,1000000);
camera.position.set(0,0,25);
camera.rotation.set(0.2,0,0);
scene.add(camera);

var spaceship;

var light = new THREE.PointLight(0xFFFFFF,2);
light.position.set(0,0,25)
scene.add(light);

var sky;

var start = setInterval(()=>{
	if(model.ready){
		spaceship = model.ship(0,0);
		spaceship.rotation.set(rad(30),0,0)
		scene.add(spaceship);

		sky = model.sky();
		scene.add(sky);

		render();
		clearInterval(start);
	}
},10);

var t = 0;
function render(){stats.begin();t+=0.1;
	requestAnimationFrame(render);
	renderer.render(scene,camera);

	spaceship.rotation.y+=pi/250;
	console.log(stats);
stats.end();}


var txt=0;
var mod=0;
var keys = [];
document.addEventListener('keydown',event=>{
	keys[event.key]=true;
	if(event.key==' '){
		cam.x=pi/16
		cam.y=pi/6
		cam.z=12
	}
	if(event.key=='ArrowLeft'){
		txt--
		if(txt<0)txt=7;
		spaceship=model.ship(txt,mod)
	}
	if(event.key=='ArrowRight'){
		txt++
		if(txt>7)txt=0;
		spaceship=model.ship(txt,mod)
	}
	if(event.key=='ArrowUp'){
		mod--
		if(mod<0)mod=12;
		scene.remove(spaceship);
		spaceship=model.ship(txt,mod);
		scene.add(spaceship);
	}
	if(event.key=='ArrowDown'){
		mod++
		if(mod>12)mod=0;
		scene.remove(spaceship);
		spaceship=model.ship(txt,mod);
		scene.add(spaceship);
	}
});
document.addEventListener('keyup',event=>{keys[event.key]=false});


document.addEventListener('mouseup',e=>{
	console.log(e)
});