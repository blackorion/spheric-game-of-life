import Game from './engine/game'
import WorldMapFactory from './engine/worldmapfactory'
import Sphere from './ui/main'

let container = document.createElement('div');
document.body.appendChild(container);

var sphere = new Sphere(container);
sphere.animate();
