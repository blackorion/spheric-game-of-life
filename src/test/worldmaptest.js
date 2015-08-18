import WorldMap from '../main/woldmap'
import WorldMapMapper from '../main/worldmapmapper'
import Triangle from '../main/trianlge'

var assert = require('assert');

describe("WorldMap", ()=> {
    it("should create a deep copy of it self", ()=> {
        let triangles = [new Triangle(0, 0), new Triangle(0, 1)];
        triangles[0].setLinked("right", triangles[1]);
        let worldMap = new WorldMap(triangles);

        let copy = worldMap.copy();

        assert.equal(copy.get(0, 0).linked("right"), copy.get(0, 1));
    });

    it("should return an triangles array by default", ()=> {
        let triangles = [new Triangle];
        let map = new WorldMap(triangles);

        assert.equal(map.getTriangles(), triangles);
    });
});