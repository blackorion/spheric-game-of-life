const ALIVE_STATE = true;
const DEAD_STATE = false;

module.exports = class Triangle {
    constructor() {
        this.state = DEAD_STATE;
        this.linkedTriangles = [];
    }

    isAlive() {
        return this.state === ALIVE_STATE;
    }

    revive() {
        this.state = ALIVE_STATE;
    }

    die() {
        this.state = DEAD_STATE;
    }

    aliveNeighboursCount() {
        let count = 0;

        for ( let neighbour of this.linkedTriangles )
            if ( neighbour.isAlive() )
                count++;

        return count;
    }

    addLink(triangle) {
        if ( this.linkedTriangles.indexOf(triangle) > -1 )
            return;

        if ( this.linkedTriangles.length === 3 )
            throw new Error("limit of linked elements");

        this.linkedTriangles.push(triangle);
    }

    addLinks(...triangle) {
        for ( let link of triangle )
            this.addLink(link);
    }

    getLinked() {
        return this.linkedTriangles;
    }
};