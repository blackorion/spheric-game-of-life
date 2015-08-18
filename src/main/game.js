module.exports = class Game {
    constructor(worldMap) {
        if ( typeof worldMap === "undefined" )
            throw new Error();

        this.worldMap = worldMap;
    }

    processNextStep() {
        let worldMapCopy = this.worldMap.copy();

        for ( let triangle of this.worldMap.triangles ) {
            let triangleCopy = worldMapCopy.get(triangle.getRow(), triangle.getIndex());

            if ( !triangle.isAlive() && triangle.aliveNeighboursCount() === 2 )
                triangleCopy.revive();
            else if ( triangle.isAlive() && (triangle.aliveNeighboursCount() === 0 || triangle.aliveNeighboursCount() === 2) )
                triangleCopy.die();
        }

        this.worldMap = worldMapCopy;
    }

    getMap() {
        return this.worldMap;
    }
};