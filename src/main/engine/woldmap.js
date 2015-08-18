import Triangle from './trianlge'
import WorldMapMapper from './worldmapmapper'

module.exports = class WorldMap {
    constructor(triangles) {
        this.triangles = triangles || [];
    }

    get(row, index) {
        return WorldMap.findTriangleFromArray(this.triangles, row, index);
    }

    size() {
        return this.triangles.length;
    }

    setMapper(mapper) {
        if ( typeof mapper === 'undefined' || !mapper instanceof WorldMapMapper)
            throw new Error("mapper should be of type WorldMapMapper");

        this.mapper = mapper;
    }

    getTriangles() {
        if (this.mapper)
            return this.mapper.map(this);

        return this.triangles;
    }

    copy() {
        let triangles = [];
        let directions = ["left", "right", "bottom", "top"];

        for ( let triangle of this.triangles ) {
            var copy = new Triangle(triangle.getRow(), triangle.getIndex());

            if ( triangle.isAlive() )
                copy.revive();

            triangles.push(copy);
        }

        for ( let triangle of triangles ) {
            let reference = this.get(triangle.getRow(), triangle.getIndex());

            for ( let direction of directions ) {
                let linked = reference.linked(direction);

                if ( linked !== null )
                    triangle.setLinked(direction, WorldMap.findTriangleFromArray(triangles, linked.getRow(), linked.getIndex()))
            }
        }

        return new WorldMap(triangles);
    }

    static findTriangleFromArray(trianglesArray, row, index) {
        for ( let triangle of trianglesArray )
            if ( triangle.getRow() === row && triangle.getIndex() === index )
                return triangle;

        throw new Error(`Element not found: ${row}:${index}`);
    }
};