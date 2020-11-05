//Attach all needed modules to window
import * as THREE from '/lib/three.js';

import * as Model from '/helper/model.js';
//import * as player from '/helper/player.js';

import * as Menu from '/Menu.js';
import * as Single from '/single.js';

window.THREE = THREE;

window.Model = Model;
//window.player = player;

window.Single = Single;
window.Menu = Menu;

//Temporary
window.specs = [
	{
		"name":"Name1",
		"speed":Math.floor(101*Math.random()),
		"attack":Math.floor(101*Math.random()),
		"health":Math.floor(101*Math.random()),
		"shield":Math.floor(101*Math.random()),
		"regen":Math.floor(101*Math.random()),
		"battery":Math.floor(101*Math.random()),
		"reactor":Math.floor(101*Math.random())
	},
	{
		"name":"Name2",
		"speed":Math.floor(101*Math.random()),
		"attack":Math.floor(101*Math.random()),
		"health":Math.floor(101*Math.random()),
		"shield":Math.floor(101*Math.random()),
		"regen":Math.floor(101*Math.random()),
		"battery":Math.floor(101*Math.random()),
		"reactor":Math.floor(101*Math.random())
	},
	{
		"name":"Name3",
		"speed":Math.floor(101*Math.random()),
		"attack":Math.floor(101*Math.random()),
		"health":Math.floor(101*Math.random()),
		"shield":Math.floor(101*Math.random()),
		"regen":Math.floor(101*Math.random()),
		"battery":Math.floor(101*Math.random()),
		"reactor":Math.floor(101*Math.random())
	},
	{
		"name":"Name4",
		"speed":Math.floor(101*Math.random()),
		"attack":Math.floor(101*Math.random()),
		"health":Math.floor(101*Math.random()),
		"shield":Math.floor(101*Math.random()),
		"regen":Math.floor(101*Math.random()),
		"battery":Math.floor(101*Math.random()),
		"reactor":Math.floor(101*Math.random())
	},
	{
		"name":"Name5",
		"speed":Math.floor(101*Math.random()),
		"attack":Math.floor(101*Math.random()),
		"health":Math.floor(101*Math.random()),
		"shield":Math.floor(101*Math.random()),
		"regen":Math.floor(101*Math.random()),
		"battery":Math.floor(101*Math.random()),
		"reactor":Math.floor(101*Math.random())
	},
	{
		"name":"Name6",
		"speed":Math.floor(101*Math.random()),
		"attack":Math.floor(101*Math.random()),
		"health":Math.floor(101*Math.random()),
		"shield":Math.floor(101*Math.random()),
		"regen":Math.floor(101*Math.random()),
		"battery":Math.floor(101*Math.random()),
		"reactor":Math.floor(101*Math.random())
	},
	{
		"name":"Name7",
		"speed":Math.floor(101*Math.random()),
		"attack":Math.floor(101*Math.random()),
		"health":Math.floor(101*Math.random()),
		"shield":Math.floor(101*Math.random()),
		"regen":Math.floor(101*Math.random()),
		"battery":Math.floor(101*Math.random()),
		"reactor":Math.floor(101*Math.random())
	},
	{
		"name":"Name8",
		"speed":Math.floor(101*Math.random()),
		"attack":Math.floor(101*Math.random()),
		"health":Math.floor(101*Math.random()),
		"shield":Math.floor(101*Math.random()),
		"regen":Math.floor(101*Math.random()),
		"battery":Math.floor(101*Math.random()),
		"reactor":Math.floor(101*Math.random())
	},
	{
		"name":"Name9",
		"speed":Math.floor(101*Math.random()),
		"attack":Math.floor(101*Math.random()),
		"health":Math.floor(101*Math.random()),
		"shield":Math.floor(101*Math.random()),
		"regen":Math.floor(101*Math.random()),
		"battery":Math.floor(101*Math.random()),
		"reactor":Math.floor(101*Math.random())
	},
	{
		"name":"Name10",
		"speed":Math.floor(101*Math.random()),
		"attack":Math.floor(101*Math.random()),
		"health":Math.floor(101*Math.random()),
		"shield":Math.floor(101*Math.random()),
		"regen":Math.floor(101*Math.random()),
		"battery":Math.floor(101*Math.random()),
		"reactor":Math.floor(101*Math.random())
	},
	{
		"name":"Name11",
		"speed":Math.floor(101*Math.random()),
		"attack":Math.floor(101*Math.random()),
		"health":Math.floor(101*Math.random()),
		"shield":Math.floor(101*Math.random()),
		"regen":Math.floor(101*Math.random()),
		"battery":Math.floor(101*Math.random()),
		"reactor":Math.floor(101*Math.random())
	},
	{
		"name":"Name12",
		"speed":Math.floor(101*Math.random()),
		"attack":Math.floor(101*Math.random()),
		"health":Math.floor(101*Math.random()),
		"shield":Math.floor(101*Math.random()),
		"regen":Math.floor(101*Math.random()),
		"battery":Math.floor(101*Math.random()),
		"reactor":Math.floor(101*Math.random())
	},
	{
		"name":"Name13",
		"speed":Math.floor(101*Math.random()),
		"attack":Math.floor(101*Math.random()),
		"health":Math.floor(101*Math.random()),
		"shield":Math.floor(101*Math.random()),
		"regen":Math.floor(101*Math.random()),
		"battery":Math.floor(101*Math.random()),
		"reactor":Math.floor(101*Math.random())
	},
]