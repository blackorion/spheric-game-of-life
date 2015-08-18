"use strict"

let camera, scene, renderer, sphere;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let ind = 0;
let sph;
let T = 2;

let cells = [];

// 0 - L, 1 - B, 2 - R
let megacells = [
	// 0
{
	L:4,
	R:1,
	B:6,
	rL:2,
	rR:0,
	rB:0
},
	// 1
{
	L:0,
	R:2,
	B:5,
	rL:2,
	rR:0,
	rB:0
},
	// 2
{
	L:1,
	R:3,
	B:9,
	rL:2,
	rR:0,
	rB:0
},
	// 3
{
	L:2,
	R:4,
	B:8,
	rL:2,
	rR:0,
	rB:0
},
	// 4
{
	L:3,
	R:0,
	B:7,
	rL:2,
	rR:0,
	rB:0
},
	// 5
{
	L:1,
	R:19,
	B:15,
	rL:1,
	rR:2,
	rB:1
},
	// 6
{
	L:0,
	R:15,
	B:16,
	rL:1,
	rR:2,
	rB:1
},
	// 7
{
	L:4,
	R:16,
	B:17,
	rL:1,
	rR:2,
	rB:1
},
	// 8
{
	L:3,
	R:17,
	B:18,
	rL:1,
	rR:2,
	rB:1
},
	// 9
{
	L:2,
	R:18,
	B:19,
	rL:1,
	rR:2,
	rB:1
},
	// 10
{
	L:14,
	R:11,
	B:15,
	rL:2,
	rR:0,
	rB:0
},
	// 11
{
	L:10,
	R:12,
	B:16,
	rL:2,
	rR:0,
	rB:0
},
	// 12
{
	L:11,
	R:13,
	B:17,
	rL:2,
	rR:0,
	rB:0
},
	// 13
{
	L:12,
	R:14,
	B:18,
	rL:2,
	rR:0,
	rB:0
},
	// 14
{
	L:13,
	R:10,
	B:19,
	rL:2,
	rR:0,
	rB:0
},
	// 15
{
	L:10,
	R:6,
	B:5,
	rL:1,
	rR:2,
	rB:1
},
	// 16
{
	L:11,
	R:7,
	B:6,
	rL:1,
	rR:2,
	rB:1
},
	// 17
{
	L:12,
	R:8,
	B:7,
	rL:1,
	rR:2,
	rB:1
},
	// 18
{
	L:13,
	R:9,
	B:8,
	rL:1,
	rR:2,
	rB:1
},
	// 19
{
	L:14,
	R:5,
	B:9,
	rL:1,
	rR:2,
	rB:1
},
	];

init();
animate();

document.addEventListener( 'mousemove', onDocumentMouseMove, false );

function onDocumentMouseMove(event) {

	mouseX = ( event.clientX - windowHalfX ) /windowHalfX;
	mouseY = ( event.clientY - windowHalfY ) /windowHalfY;

}

function init(){
	for(let i = 0; i < 20*parseInt(Math.pow(4,T));++i)
		cells.push({
			state:false,
			links:[]
		});
	let c = 0;
	const cell_max = parseInt(Math.pow(4,T));
	const side_max = parseInt(Math.pow(2,T))-1;
	for(let M = 0; M < 20; ++M){ // M for megacell
		for(let t=0;t<parseInt(Math.pow(2,T));++t){ // "row"
			let r = parseInt(Math.pow(2,T+1))-(1+t)*2; // number of elements in the row
			for(let n = 0; n <= r; ++n){ // position within a row
				if(n%2){
					cells[c].links.push(c-1);
					cells[c].links.push(c+1);
					cells[c].links.push(c+r);
				}else{
					if(n != 0) cells[c].links.push(c-1);
					if(n != r) cells[c].links.push(c+1);
					if(t!=0)cells[c].links.push(c-(r+2));
				}
				c++;
			}
		}
		switch(megacells[M].rL){
			case 0:
				for(let i=0;i<=side_max;++i)
					cells[i*2+cell_max*M].links.push((side_max-i)*2+cell_max*megacells[M].L);
				break;
			case 1:
				for(let i=0;i<=side_max;++i)
					cells[i*2+cell_max*M].links.push(parseInt(Math.pow(4,T))-1-parseInt(Math.pow(parseInt(Math.pow(2,T))-(side_max-i)-1,2))+cell_max*megacells[M].L);
				break;
			case 2:
				for(let i=0;i<=side_max;++i)
					cells[i*2+cell_max*M].links.push(parseInt(Math.pow(4,T))-1-(side_max-i)*((side_max-i)+2)+cell_max*megacells[M].L);
				break;
		}
		switch(megacells[M].rB){
			case 0:
				for(let i=0;i<=side_max;++i)
					cells[parseInt(Math.pow(4,T))-1-parseInt(Math.pow(parseInt(Math.pow(2,T))-i-1,2))+cell_max*M].links.push((side_max-i)*2+cell_max*megacells[M].B);
				break;
			case 1:
				for(let i=0;i<=side_max;++i)
					cells[parseInt(Math.pow(4,T))-1-parseInt(Math.pow(parseInt(Math.pow(2,T))-i-1,2))+cell_max*M].links.push(parseInt(Math.pow(4,T))-1-parseInt(Math.pow(parseInt(Math.pow(2,T))-(side_max-i)-1,2))+cell_max*megacells[M].B);
				break;
			case 2:
				for(let i=0;i<=side_max;++i)
					cells[parseInt(Math.pow(4,T))-1-parseInt(Math.pow(parseInt(Math.pow(2,T))-i-1,2))+cell_max*M].links.push(parseInt(Math.pow(4,T))-1-(side_max-i)*((side_max-i)+2)+cell_max*megacells[M].B);
				break;
		}
		switch(megacells[M].rR){
			case 0:
				for(let i=0;i<=side_max;++i)
					cells[parseInt(Math.pow(4,T))-1-i*(i+2)+cell_max*M].links.push((side_max-i)*2+cell_max*megacells[M].R);
				break;
			case 1:
				for(let i=0;i<=side_max;++i)
					cells[parseInt(Math.pow(4,T))-1-i*(i+2)+cell_max*M].links.push(parseInt(Math.pow(4,T))-1-parseInt(Math.pow(parseInt(Math.pow(2,T))-(side_max-i)-1,2))+cell_max*megacells[M].R);
				break;
			case 2:
				for(let i=0;i<=side_max;++i)
					cells[parseInt(Math.pow(4,T))-1-i*(i+2)+cell_max*M].links.push(parseInt(Math.pow(4,T))-1-(side_max-i)*((side_max-i)+2)+cell_max*megacells[M].R);
				break;
		}

	}




	let container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 500;

	scene = new THREE.Scene();

	sph = new THREE.IcosahedronGeometry(200, T);

	for(let i in sph.faces){
		// let a = (i % 16)/(16);
		let a = i/(20*Math.pow(4,T));
		sph.faces[i].color.setHex(((parseInt(a*0xff)<<16)+(parseInt(a*0xff)<<8)+parseInt(a*0xff)));
	}

	sphere = new THREE.Mesh( sph,new THREE.MeshBasicMaterial({vertexColors:THREE.FaceColors}));
	// sphere = new THREE.Mesh( geom,  new THREE.MeshNormalMaterial());
	// sphere.position.y = -500;
	sphere.rotation.x = Math.PI*0.25;

	// let helper = new THREE.WireframeHelper( sphere,0 );
	let helper = sphere.clone();
	helper.material = new THREE.MeshBasicMaterial({wireframe:true,color:0});
	helper.scale.multiplyScalar(1.005);
	scene.add( sphere );
	scene.add( helper );

	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0x777777 );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.sortObjects = false;

	container.appendChild( renderer.domElement );
}

function animate(){
	requestAnimationFrame( animate );

	ind = parseInt(Date.now() / 1000) % parseInt(20*Math.pow(4,T));
	// console.log(ind);
	// ind = parseInt(Date.now() / 2000) % 20;
	for(let i in sph.faces){
		sph.faces[i].color.setHex(0x555555);
	}

	// let tmp = ind;
	// for(let x = 0; x < parseInt(Math.pow(4,T));++x)
	// 	sph.faces[x+parseInt(Math.pow(4,T))*tmp].color.setHex(0x00ffff);
	// for(let i = 0; i < 3; ++i){
	// 	tmp = megacells[ind].L;
	// 	for(let x = 0; x < parseInt(Math.pow(4,T));++x)
	// 		sph.faces[x+parseInt(Math.pow(4,T))*tmp].color.setHex(0x00ffff);
	// 	tmp = megacells[ind].R;
	// 	for(let x = 0; x < parseInt(Math.pow(4,T));++x)
	// 		sph.faces[x+parseInt(Math.pow(4,T))*tmp].color.setHex(0x00ffff);
	// 	tmp = megacells[ind].B;
	// 	for(let x = 0; x < parseInt(Math.pow(4,T));++x)
	// 		sph.faces[x+parseInt(Math.pow(4,T))*tmp].color.setHex(0x00ffff);
	// }

	sph.faces[ind].color.setHex(0x00ffff);
	for(let i of cells[ind].links){
		sph.faces[i].color.setHex(0x00ffff);
		// console.log(i);
	}


	// for(let i = 0; i < 20; ++i){
	// 	sph.faces[(ind+i*parseInt(Math.pow(4,T))) % parseInt(20*Math.pow(4,T))].color.setHex(0x00ffff);
	// 	sph.faces[(ind+20+i*parseInt(Math.pow(4,T))) % parseInt(20*Math.pow(4,T))].color.setHex(0x00ffff);
	// 	sph.faces[(ind+40+i*parseInt(Math.pow(4,T))) % parseInt(20*Math.pow(4,T))].color.setHex(0x00ffff);
	// 	sph.faces[(ind+60+i*parseInt(Math.pow(4,T))) % parseInt(20*Math.pow(4,T))].color.setHex(0x00ffff);
	// 	sph.faces[(ind+80+i*parseInt(Math.pow(4,T))) % parseInt(20*Math.pow(4,T))].color.setHex(0x00ffff);
	// }
	sph.elementsNeedUpdate = true;
	sph.colorsNeedUpdate = true;
	sph.verticesNeedUpdate = true;
	// sphere.rotation.y -= 0.001*Math.PI;
	camera.position.x = -Math.sin(mouseX*Math.PI)*500*Math.cos(mouseY*Math.PI/2);
	camera.position.z = Math.cos(mouseX*Math.PI)*500*Math.cos(mouseY*Math.PI/2);
	camera.position.y = Math.sin(mouseY*Math.PI/2)*500;

	camera.lookAt( scene.position );

	renderer.render( scene, camera );

}
