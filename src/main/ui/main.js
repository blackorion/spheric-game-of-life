import * as CellGenerator from './generator'

let camera, scene, renderer, sphere;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let ind = 0;
let sph;



function onDocumentMouseMove(event) {
    mouseX = ( event.clientX - windowHalfX ) / windowHalfX;
    mouseY = ( event.clientY - windowHalfY ) / windowHalfY;
}

module.exports = class Sphere {
    constructor(container, game) {
        this.container = container;
        this.game = game;
        this.detalisationLevel = 0;
        this.cells = CellGenerator.generateCells(this.detalisationLevel);
        this.init();
    }

    init() {
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);

        this.scene = new THREE.Scene();
        this.sph = new THREE.IcosahedronGeometry(200, this.detalisationLevel);
        this.sphere = new THREE.Mesh(sph, new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors}));

        let helper = this.sphere.clone();
        helper.material = new THREE.MeshBasicMaterial({wireframe: true, color: 0});
        helper.scale.multiplyScalar(1.005);
        this.scene.add(this.sphere);
        this.scene.add(helper);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x777777);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.sortObjects = false;

        this.container.appendChild(this.renderer.domElement);
    }

    animate() {
        let self = this;

        (function loop() {
            requestAnimationFrame(loop);
            self.render();
        })();
    }

    render() {
        let ind = parseInt(Date.now() / 1000) % parseInt(20 * Math.pow(4, this.detalisationLevel));

        for (let face of this.sph.faces)
            face.color.setHex(0x555555);

        this.sph.faces[ind].color.setHex(0x00ffff);

        for (let i of this.cells[ind].links)
            this.sph.faces[i].color.setHex(0x00ffff);

        this.sph.elementsNeedUpdate = true;
        this.sph.colorsNeedUpdate = true;
        this.sph.verticesNeedUpdate = true;

        this.camera.position.x = -Math.sin(mouseX * Math.PI) * 500 * Math.cos(mouseY * Math.PI / 2);
        this.camera.position.z = Math.cos(mouseX * Math.PI) * 500 * Math.cos(mouseY * Math.PI / 2);
        this.camera.position.y = Math.sin(mouseY * Math.PI / 2) * 500;

        this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera);
    }
};
