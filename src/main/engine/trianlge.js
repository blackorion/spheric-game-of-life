const DEAD_STATE = 'dead';
const ALIVE_STATE = 'alive';

module.exports = class Triangle {
    constructor(row, index) {
        this.row = row;
        this.index = index;
        this.state = DEAD_STATE;
        this.linkedTriangles = new Map();
        this.directions = { right: "left", left: "right", top: "bottom", bottom: "top" };
    }

    getRow() {
        return this.row;
    }

    getIndex() {
        return this.index;
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
        let directions = ["left", "right", "bottom", "top"];

        for ( let direction of directions ) {
            if ( !this.linkedTriangles.has(direction) )
                continue;

            var neighbour = this.linkedTriangles.get(direction);

            if ( neighbour.isAlive() )
                count++;
        }

        return count;
    }

    linked(direction) {
        if ( this.linkedTriangles.has(direction) )
            return this.linkedTriangles.get(direction);
        else
            return null;
    }

    setLinked(direction, triangle) {
        this.linkedTriangles.set(direction, triangle);

        if ( triangle.linked(this.directions[direction]) !== this )
            triangle.setLinked(this.directions[direction], this);
    }
};