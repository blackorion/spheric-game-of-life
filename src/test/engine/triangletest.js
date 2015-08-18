import Triangle from '../../main/engine/trianlge'

var assert = require('assert');

describe("Triangle", ()=> {
    var tests = [
        { initDirection: "right", expectedDirection: "left" },
        { initDirection: "left", expectedDirection: "right" },
        { initDirection: "top", expectedDirection: "bottom" },
        { initDirection: "bottom", expectedDirection: "top" }
    ];

    describe("when linking triangle", ()=> {
        tests.forEach((test)=> {
            it(`should set link of linked triangle from ${test.initDirection} back to ${test.expectedDirection} side`, ()=> {
                let mainTriangle = new Triangle();
                let linkedTriangle = new Triangle();

                mainTriangle.setLinked(test.initDirection, linkedTriangle);

                assert.equal(mainTriangle, linkedTriangle.linked(test.expectedDirection));
            });
        });
    });
});