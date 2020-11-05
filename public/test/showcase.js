import * as THREE from '/lib/three.js'
import * as model from '/helper/model.js'

var stat_fps = new Stats();
var stat_ms = new Stats();

stat_fps.showPanel(0);
stat_ms.showPanel(1);
document.body.appendChild(stat_fps.dom);
document.body.appendChild(stat_ms.dom);

stat_ms.dom.style.left = '80px';

const pi = Math.PI;

var cam = {
	x:pi/16,
	y:pi/6,
	z:12
}

function deg(rad){return(rad*180/pi)}
function rad(deg){return(deg*pi/180)}

var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setClearColor(0,1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,0.1,1000000);
camera.position.set(0,25,0);
camera.rotation.set(rad(-90),0,0);
scene.add(camera);

var spaceship;

var light = new THREE.PointLight(0xFFFFFF,2);
scene.add(light);

var sky;

var start = setInterval(()=>{
	if(model.ready){
		spaceship = model.ship(0,0);
		scene.add(spaceship);

		sky = model.sky();
		scene.add(sky);

		render();
		clearInterval(start);
	}
},10);

var t = 0;
//stat_ms.begin();
//stat_fps.begin();
function render(){
	stat_ms.begin();
	stat_fps.begin();
	t+=0.1;
	requestAnimationFrame(render);
	renderer.render(scene,camera);

	if(keys['s']){cam.y-=0.03;if(cam.y<-pi/2)cam.y=-pi/2}
	if(keys['a'])cam.x-=0.03;
	if(keys['w']){cam.y+=0.03;if(cam.y>pi/2)cam.y=pi/2}
	if(keys['d'])cam.x+=0.03;
	if(keys['q'])cam.z+=0.1;
	if(keys['e']){
		cam.z-=0.1
		if(cam.z<5)cam.z=5;
	};


	
	/*spaceship.traverse(child=>{
		if(child.isMesh){
			console.log((Math.sin(t)/2)+0.5)
			child.material.emissiveIntensity=(Math.sin(t)/100)+0.01;
		};
	});*/

	var px = cam.z*Math.sin(cam.x)*Math.cos(cam.y);
	var py = cam.z*Math.sin(cam.y);
	var pz = cam.z*Math.cos(cam.x)*Math.cos(cam.y);
	camera.position.set(px,py,pz);
	light.position.set(px,py,pz);
	camera.lookAt(0,0,0);
	stat_ms.end();
	stat_fps.end();
}


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
window.addEventListener('resize',()=>{
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
})