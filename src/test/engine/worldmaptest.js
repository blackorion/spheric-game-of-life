import WorldMap from '../../main/engine/worldmap'
import WorldMapMapper from '../../main/engine/worldmapmapper'
import Triangle from '../../main/engine/trianlge'

var assert = require('assert');

describe("WorldMap", ()=> {
    it("should create a deep copy of it self", ()=> {
        let triangles = [new Triangle, new Triangle];
        triangles[0].addLink(triangles[1]);
        triangles[1].addLink(triangles[0]);
        let worldMap = new WorldMap(triangles);

        let copy = worldMap.copy();
        assert.ok(copy.get(0).getLinked().indexOf(copy.get(1)) > -1);
    });

    it("should return an triangles array by default", ()=> {
        let triangles = [new Triangle];
        let map = new WorldMap(triangles);

        assert.equal(map.getTriangles(), triangles);
    });
});