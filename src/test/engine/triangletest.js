import Triangle from '../../main/engine/trianlge'

var assert = require('assert');

describe("Triangle", ()=> {
    describe("when linking triangle", ()=> {
        it("should throw error if linking more than 3 neighbours", ()=> {
            let triangle = new Triangle();
            triangle.addLinks(new Triangle, new Triangle, new Triangle);

            assert.throws(()=>triangle.addLink(new Triangle), Error);
        });
    });
});