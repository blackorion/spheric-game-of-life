var assert = require("assert");

import Game from '../../main/engine/game';
import WorldMapFactory from '../../main/engine/worldmapfactory';

describe("Game", ()=> {
    var worldMap;
    var game;

    beforeEach(()=> {
        worldMap = WorldMapFactory.create();
        game = new Game(worldMap);
    });

    describe("when cell is dead", ()=> {
        it("should stay dead if all neighbours are dead", ()=> {
            game.processNextStep();
            let nextStepMap = game.getMap();

            assert.equal(nextStepMap.get(0).isAlive(), false);
        });

        it("should die if 1 neighbour is alive", ()=> {
            worldMap.get(1).revive();

            game.processNextStep();
            let nextStepMap = game.getMap();

            assert.equal(nextStepMap.get(0).isAlive(), false);
        });

        it("should rise if 2 neighbours are alive", ()=> {
            worldMap.get(1).revive();
            worldMap.get(4).revive();

            game.processNextStep();
            let nextStepMap = game.getMap();

            assert.equal(nextStepMap.get(0).isAlive(), true);
        });

        it("should stay dead if 3 neighbours are alive", ()=> {
            worldMap.get(1).revive();
            worldMap.get(4).revive();
            worldMap.get(6).revive();

            game.processNextStep();
            let nextStepMap = game.getMap();

            assert.equal(nextStepMap.get(0).isAlive(), false);
        });
    });

    describe("when cell is alive", ()=> {
        beforeEach(()=> {
            worldMap.get(0).revive();
        });

        it("should die if no living neighbours", ()=> {
            game.processNextStep();
            let nextStepMap = game.getMap();

            assert.equal(nextStepMap.get(0).isAlive(), false);
        });

        it("should live if has 1 living neighbour", ()=> {
            worldMap.get(1).revive();

            game.processNextStep();
            let nextStepMap = game.getMap();

            assert.equal(nextStepMap.get(0).isAlive(), true);
        });

        it("should live if has 2 living neighbours", ()=> {
            worldMap.get(4).revive();
            worldMap.get(6).revive();

            game.processNextStep();
            let nextStepMap = game.getMap();

            assert.equal(nextStepMap.get(0).isAlive(), true);
        });

        it("should die if has 3 living neighbours", ()=> {
            worldMap.get(1).revive();
            worldMap.get(4).revive();
            worldMap.get(6).revive();

            game.processNextStep();
            let nextStepMap = game.getMap();

            assert.equal(nextStepMap.get(0).isAlive(), false);
        });
    });

    describe("when making 2 steps", ()=> {
        it("should make a valid calculations", ()=> {
            worldMap.get(1).revive();
            worldMap.get(6).revive();

            game.processNextStep();
            let nextStepMap = game.getMap();

            assert.equal(nextStepMap.get(0).isAlive(), true);

            game.processNextStep();
            nextStepMap = game.getMap();

            assert.equal(nextStepMap.get(0).isAlive(), false);
        });
    });
});