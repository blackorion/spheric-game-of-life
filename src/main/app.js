import Game from './engine/game'
import WorldMapFactory from './engine/worldmapfactory'
import Sphere from './ui/main'

var container = document.createElement('div');
document.body.appendChild(container);

var map = WorldMapFactory.generateRandom(4);
var game = new Game(map);

new Sphere(container, game).animate();
