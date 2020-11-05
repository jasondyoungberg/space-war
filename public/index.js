var width,height,hud,pi,deg,rad,sin,atan2,rand,floor,mod,stats,renderer,scene,camera,t,mode,key,mouse;
function load(){

{//useful
	width = window.innerWidth;
	height = window.innerHeight;
	hud = document.getElementById('hud');

	pi = Math.PI;
	deg = x=>(x*180/pi);
	rad = x=>(x*pi/180);
	sin = Math.sin;
	cos = Math.cos;
	atan2 = Math.atan2;
	rand = (x=1)=>(Math.random()*x);
	floor = Math.floor;
	mod = (a,b)=>(((a%b)+b)%b);
}
{//statistics
	stats = new Stats();
	stats.addPanel(new Stats.Panel('','#0000','#0000'));
	stats.showPanel(3);
	document.body.appendChild(stats.domElement);
}
{//threejs essentials
	{//render
		renderer = new THREE.WebGLRenderer({antialias:true});
		renderer.setSize(width,height);
		renderer.setClearColor(0,1);
		document.body.appendChild(renderer.domElement);
	}
	{//scene
		scene = new THREE.Scene();
	}
	{//camera
		camera = new THREE.PerspectiveCamera(70,width/height,0.01,1000000);
		scene.add(camera);
	}
}
{//event listeners
	window.addEventListener('resize',ev=>{//change resolution when resized
		width = window.innerWidth;
		height = window.innerHeight;
		camera.aspect = width/height;
		camera.updateProjectionMatrix();
		renderer.setSize(width,height);
		hud.width=width;
		hud.height=height;

		if(mode=='menu')Menu.event.resize(ev);
		if(mode=='main')Main.event.resize(ev);
	});
	{//Keep track of which keys are pressed
		keys = {}

		document.addEventListener('keydown',ev=>{
			keys[ev.key]=true;
			if(mode=='menu')Menu.event.keydown(ev);
			if(mode=='main')Main.event.keydown(ev);
		});

		document.addEventListener('keyup',ev=>{
			keys[ev.key]=false;
			if(mode=='menu')Menu.event.keyup(ev);
			if(mode=='main')Main.event.keyup(ev);
		});
	}
	{//Keep track of which mouse buttons are pressed
		mouse = {
			left:false,
			right:false,
			middle:false,
			x:0,y:0
		};
		document.addEventListener('mousedown',ev=>{
			mouse = {
				left:ev.buttons%2>0,
				right:ev.buttons%4>1,
				middle:ev.buttons%8>3,
				x:ev.clientX,
				y:ev.clientY
			}
			if(mode=='menu')Menu.event.mousedown(ev);
			if(mode=='main')Main.event.mousedown(ev);
		});
		document.addEventListener('mousemove',ev=>{
			mouse = {
				left:ev.buttons%2>0,
				right:ev.buttons%4>1,
				middle:ev.buttons%8>3,
				x:ev.clientX,
				y:ev.clientY
			}
			if(mode=='menu')Menu.event.mousedown(ev);
			if(mode=='main')Main.event.mousedown(ev);
		});
		document.addEventListener('mouseup',ev=>{
			mouse = {
				left:ev.buttons%2>0,
				right:ev.buttons%4>1,
				middle:ev.buttons%8>3,
				x:ev.clientX,
				y:ev.clientY
			}
			if(mode=='menu')Menu.event.mouseup(ev);
			if(mode=='main')Main.event.mouseup(ev);
		});
	}
}

t=0;
function render(){//ran every frame
	if(mode=='menu'){
		Menu.loop();
		if(Menu.mode!='menu'){
			Menu.exit();
			mode = Menu.mode;

			if(mode=='main')Main.init();
		}
	}
	if(mode=='main'){
		Main.loop();
		if(Menu.mode!='main'){
			Main.exit();
			mode = Main.mode;

			if(mode=='menu')Menu.init();
		}
	}
	
	requestAnimationFrame(render);
	stats.begin();t++;
	renderer.render(scene,camera);
	stats.end();
}
ready_loop = setInterval(()=>{//wait until everything is loaded
	if(model.ready){
		mode = 'menu';
		Menu.init();
		render();
		clearInterval(ready_loop);
	}
});

}