import * as CellGenerator from './generator'

let camera, scene, renderer, sphere;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let ind = 0;
let sph;
let T = 2;
let cells = CellGenerator.generateCells(T);

document.addEventListener('mousemove', onDocumentMouseMove, false);

function onDocumentMouseMove(event) {
    mouseX = ( event.clientX - windowHalfX ) / windowHalfX;
    mouseY = ( event.clientY - windowHalfY ) / windowHalfY;
}

export function init() {
    let container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);

    scene = new THREE.Scene();
    sph = new THREE.IcosahedronGeometry(200, T);
    sphere = new THREE.Mesh(sph, new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors }));

    let helper = sphere.clone();
    helper.material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0 });
    helper.scale.multiplyScalar(1.005);
    scene.add(sphere);
    scene.add(helper);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x777777);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = false;

    container.appendChild(renderer.domElement);
}

export function animate() {
    requestAnimationFrame(animate);

    ind = parseInt(Date.now() / 1000) % parseInt(20 * Math.pow(4, T));

    for ( let i in sph.faces )
        sph.faces[i].color.setHex(0x555555);

    sph.faces[ind].color.setHex(0x00ffff);

    for ( let i of cells[ind].links )
        sph.faces[i].color.setHex(0x00ffff);

    sph.elementsNeedUpdate = true;
    sph.colorsNeedUpdate = true;
    sph.verticesNeedUpdate = true;

    camera.position.x = -Math.sin(mouseX * Math.PI) * 500 * Math.cos(mouseY * Math.PI / 2);
    camera.position.z = Math.cos(mouseX * Math.PI) * 500 * Math.cos(mouseY * Math.PI / 2);
    camera.position.y = Math.sin(mouseY * Math.PI / 2) * 500;

    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}
