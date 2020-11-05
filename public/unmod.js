//Attach all needed modules to window
import * as THREE from '/lib/three.js';

import * as Model from '/helper/model.js';
//import * as Player from '/helper/player.js';
import * as Socket from '/helper/socket.js';

import * as Menu from '/Menu.js';
import * as Single from '/single.js';

window.THREE = THREE;

window.Model = Model;
//window.Player = Player;
window.Socket = Socket;

window.Single = Single;
window.Menu = Menu;

function random(){
	let u = 0, v = 0;
	while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
	while(v === 0) v = Math.random();
	let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
	num = num / 10.0 + 0.5; // Translate to 0 -> 1
	num = Math.round((160*num)-30);
	if (num > 100 || num < 0) return random(); // resample between 0 and 1
	return num;
}

//Temporary
window.specs = [
	{
		"name":'0x'+[...Array(8)].map(()=>Math.floor(Math.random()*16).toString(16)).join('').toUpperCase(),
		"speed":random(),
		"attack":random(),
		"health":random(),
		"shield":random(),
		"regen":random(),
		"battery":random(),
		"reactor":random()
	},
	{
		"name":'0x'+[...Array(8)].map(()=>Math.floor(Math.random()*16).toString(16)).join('').toUpperCase(),
		"speed":random(),
		"attack":random(),
		"health":random(),
		"shield":random(),
		"regen":random(),
		"battery":random(),
		"reactor":random()
	},
	{
		"name":'0x'+[...Array(8)].map(()=>Math.floor(Math.random()*16).toString(16)).join('').toUpperCase(),
		"speed":random(),
		"attack":random(),
		"health":random(),
		"shield":random(),
		"regen":random(),
		"battery":random(),
		"reactor":random()
	},
	{
		"name":'0x'+[...Array(8)].map(()=>Math.floor(Math.random()*16).toString(16)).join('').toUpperCase(),
		"speed":random(),
		"attack":random(),
		"health":random(),
		"shield":random(),
		"regen":random(),
		"battery":random(),
		"reactor":random()
	},
	{
		"name":'0x'+[...Array(8)].map(()=>Math.floor(Math.random()*16).toString(16)).join('').toUpperCase(),
		"speed":random(),
		"attack":random(),
		"health":random(),
		"shield":random(),
		"regen":random(),
		"battery":random(),
		"reactor":random()
	},
	{
		"name":'0x'+[...Array(8)].map(()=>Math.floor(Math.random()*16).toString(16)).join('').toUpperCase(),
		"speed":random(),
		"attack":random(),
		"health":random(),
		"shield":random(),
		"regen":random(),
		"battery":random(),
		"reactor":random()
	},
	{
		"name":'0x'+[...Array(8)].map(()=>Math.floor(Math.random()*16).toString(16)).join('').toUpperCase(),
		"speed":random(),
		"attack":random(),
		"health":random(),
		"shield":random(),
		"regen":random(),
		"battery":random(),
		"reactor":random()
	},
	{
		"name":'0x'+[...Array(8)].map(()=>Math.floor(Math.random()*16).toString(16)).join('').toUpperCase(),
		"speed":random(),
		"attack":random(),
		"health":random(),
		"shield":random(),
		"regen":random(),
		"battery":random(),
		"reactor":random()
	},
	{
		"name":'0x'+[...Array(8)].map(()=>Math.floor(Math.random()*16).toString(16)).join('').toUpperCase(),
		"speed":random(),
		"attack":random(),
		"health":random(),
		"shield":random(),
		"regen":random(),
		"battery":random(),
		"reactor":random()
	},
	{
		"name":'0x'+[...Array(8)].map(()=>Math.floor(Math.random()*16).toString(16)).join('').toUpperCase(),
		"speed":random(),
		"attack":random(),
		"health":random(),
		"shield":random(),
		"regen":random(),
		"battery":random(),
		"reactor":random()
	},
	{
		"name":'0x'+[...Array(8)].map(()=>Math.floor(Math.random()*16).toString(16)).join('').toUpperCase(),
		"speed":random(),
		"attack":random(),
		"health":random(),
		"shield":random(),
		"regen":random(),
		"battery":random(),
		"reactor":random()
	},
	{
		"name":'0x'+[...Array(8)].map(()=>Math.floor(Math.random()*16).toString(16)).join('').toUpperCase(),
		"speed":random(),
		"attack":random(),
		"health":random(),
		"shield":random(),
		"regen":random(),
		"battery":random(),
		"reactor":random()
	},
	{
		"name":'0x'+[...Array(8)].map(()=>Math.floor(Math.random()*16).toString(16)).join('').toUpperCase(),
		"speed":random(),
		"attack":random(),
		"health":random(),
		"shield":random(),
		"regen":random(),
		"battery":random(),
		"reactor":random()
	},
]