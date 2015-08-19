import WorldMap from './worldmap'
import Triangle from './trianlge'
import * as Generator from './generator'

module.exports = class WorldMapFactory {
    static generateRandom(detalisation = 0) {
        let triangles = Generator.generateCells(detalisation);

        for ( let triangle of triangles )
            if ( Math.random() > 0.5 )
                triangle.revive();

        return new WorldMap(triangles, detalisation);
    }

    static create(detalisation = 0) {
        let triangles = Generator.generateCells(detalisation);

        return new WorldMap(triangles, detalisation);
    }
};