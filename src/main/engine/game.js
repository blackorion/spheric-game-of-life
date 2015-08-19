module.exports = class Game {
    constructor(worldMap) {
        if ( typeof worldMap === "undefined" )
            throw new Error("Map should be passed as argument");

        this.worldMap = worldMap;
    }

    processNextStep() {
        let worldMapCopy = this.worldMap.copy();

        for ( let ix in this.worldMap.triangles ) {
            let triangle = this.worldMap.get(ix);
            let triangleCopy = worldMapCopy.get(ix);

            if ( !triangle.isAlive() && triangle.aliveNeighboursCount() === 2 )
                triangleCopy.revive();
            else if ( triangle.isAlive() && (triangle.aliveNeighboursCount() === 0 || triangle.aliveNeighboursCount() > 2) )
                triangleCopy.die();
        }

        this.worldMap = worldMapCopy;
    }

    getMap() {
        return this.worldMap;
    }

    getDetalisation() {
        return this.worldMap.getDetalisation();
    }
};