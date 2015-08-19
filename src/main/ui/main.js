let mouseX = 0, mouseY = 0,
    windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2,
    then = Date.now();

const FRAME_INTERVAL = 200;

function onDocumentMouseMove(event) {
    mouseX = ( event.clientX - windowHalfX ) / windowHalfX;
    mouseY = ( event.clientY - windowHalfY ) / windowHalfY;
}

module.exports = class Sphere {
    constructor(container, game) {
        this.container = container;
        this.game = game;
        this.detalisationLevel = game.getDetalisation();
        this.init();
    }

    init() {
        document.addEventListener('mousemove', onDocumentMouseMove, false);

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);

        this.generateGeometry();
        this.updateCellsStepColors();

        this.scene = new THREE.Scene();
        this.scene.add(this.generateSphere());
        this.scene.add(this.generateWireframe());

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x777777);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.sortObjects = false;

        this.container.appendChild(this.renderer.domElement);
    }

    generateGeometry() {
        this.sphereGeometry = new THREE.IcosahedronGeometry(200, this.detalisationLevel);
    }

    generateSphere() {
        this.sphere = new THREE.Mesh(this.sphereGeometry, new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors }));

        return this.sphere;
    }

    generateWireframe() {
        let wireframe = this.sphere.clone();
        wireframe.material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0 });
        wireframe.scale.multiplyScalar(1.005);

        return wireframe;
    }

    animate() {
        let self = this;

        (function loop() {
            requestAnimationFrame(loop);
            self.render();
        })();
    }

    render() {
        let now = Date.now();
        let delta = now - then;

        if ( delta > FRAME_INTERVAL ) {
            this.renderNextGameStep();
            then = now - (delta % FRAME_INTERVAL);
        }

        this.camera.position.x = -Math.sin(mouseX * Math.PI) * 500 * Math.cos(mouseY * Math.PI / 2);
        this.camera.position.z = Math.cos(mouseX * Math.PI) * 500 * Math.cos(mouseY * Math.PI / 2);
        this.camera.position.y = Math.sin(mouseY * Math.PI / 2) * 500;
        this.camera.lookAt(this.scene.position);
        this.renderer.render(this.scene, this.camera);
    }

    renderNextGameStep() {
        this.game.processNextStep();
        this.updateCellsStepColors();
        this.sphereGeometry.colorsNeedUpdate = true;
    }

    updateCellsStepColors() {
        let map = this.game.getMap();
        let cells = map.getTriangles();

        for ( let i = 0; i < cells.length; i++ ) {
            if ( cells[i].isAlive() )
                this.sphereGeometry.faces[i].color.setHex(0x00ffff);
            else
                this.sphereGeometry.faces[i].color.setHex(0x555555);
        }
    }
};