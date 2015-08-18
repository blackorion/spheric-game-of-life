var assert = require("assert");

import WorldMapFactory from "../main/worldmapfactory";
import Triangle from "../main/trianlge";

describe("WorldMapFactory", ()=> {
    describe("default world initialization", ()=> {
        it("creates world with 20 triangles", ()=> {
            let map = WorldMapFactory.create();

            assert.equal(20, map.size());
        });

        it("should have default triangles linked", ()=> {
            let map = WorldMapFactory.create();

            assert.equal(map.get(0, 0).linked("right"), map.get(0, 1));
            assert.equal(map.get(0, 0).linked("bottom"), map.get(1, 1));
            assert.equal(map.get(0, 4).linked("right"), map.get(0, 0));
        });
    });

    describe("creates configured level world map", ()=> {
        it("should create a world with 80 triangles", ()=> {
            let world = WorldMapFactory.create(1);

            assert.equal(world.size(), 80);
        });
    });

    describe("when tessellating triangle", ()=> {
        it("should create 4 new triangles from single triangle", ()=> {
            let tessellatedElelement = WorldMapFactory.tessellate(new Triangle(""));

            assert.notEqual(tessellatedElelement.left, undefined);
            assert.notEqual(tessellatedElelement.right, undefined);
            assert.notEqual(tessellatedElelement.top, undefined);
            assert.notEqual(tessellatedElelement.bottom, undefined);
        });

        it("should link new triangles", ()=>{
            var tessellatedElement = WorldMapFactory.tessellate(new Triangle());

            assert.equal(tessellatedElement.top.linked("bottom"), tessellatedElement.bottom);
        });
    });
});

describe("Triangle", ()=> {
    it("should set link for both directions", ()=> {
        shouldLinkBothDirections("right", "left");
        shouldLinkBothDirections("left", "right");
        shouldLinkBothDirections("bottom", "top");
        shouldLinkBothDirections("top", "bottom");
    });

    function shouldLinkBothDirections(setDirection, expectedDirection) {
        let mainTriangle = new Triangle();
        let linkedTriangle = new Triangle();

        mainTriangle.setLinked(setDirection, linkedTriangle);

        assert.equal(mainTriangle, linkedTriangle.linked(expectedDirection));
    }
});