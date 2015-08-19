import Triangle from './trianlge'
import WorldMapMapper from './worldmapmapper'

module.exports = class WorldMap {
    constructor(triangles, detalisation) {
        this.triangles = triangles || [];
        this.detalisation = detalisation;
    }

    get(index) {
        return this.triangles[index];
    }

    getDetalisation() {
        return this.detalisation;
    }

    size() {
        return this.triangles.length;
    }

    setMapper(mapper) {
        if ( typeof mapper === 'undefined' || !mapper instanceof WorldMapMapper )
            throw new Error("mapper should be of type WorldMapMapper");

        this.mapper = mapper;
    }

    getTriangles() {
        if ( this.mapper )
            return this.mapper.map(this);

        return this.triangles;
    }

    copy() {
        let triangles = [];

        for ( let triangle of this.triangles ) {
            var copy = new Triangle();

            if ( triangle.isAlive() )
                copy.revive();

            triangles.push(copy);
        }

        for ( let ix in triangles ) {
            let reference = this.get(ix);

            for ( let linked of reference.getLinked() ) {
                let index = this.triangles.indexOf(linked);

                triangles[ix].addLink(triangles[index]);
            }
        }

        return new WorldMap(triangles, this.detalisation);
    }
};