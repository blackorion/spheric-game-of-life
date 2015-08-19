var assert = require("assert");

import WorldMapFactory from "../../main/engine/worldmapfactory";
import Triangle from "../../main/engine/trianlge";

describe("WorldMapFactory", ()=> {
    describe("default world initialization", ()=> {
        let map;

        beforeEach(()=> {
            map = WorldMapFactory.create();
        });

        it("creates world with 20 triangles", ()=> {
            assert.equal(20, map.size());
        });

        let defaultLinksTest = [
            { triangle: 0, linkedTo: 1 },
            { triangle: 0, linkedTo: 4 },
            { triangle: 4, linkedTo: 0 },
            { triangle: 0, linkedTo: 6 }
        ];

        defaultLinksTest.forEach((test)=> {
            it(`should have links between #${test.triangle} and #${test.linkedTo}`, ()=> {
                assert.ok(map.get(test.triangle).getLinked().indexOf(map.get(test.linkedTo)) > -1);
            });
        });
    });

    describe("when creating configured level world map", ()=> {
        it("should generate a world with 80 triangles with level one", ()=> {
            let world = WorldMapFactory.create(1);

            assert.equal(world.size(), 80);
        });
    });
});