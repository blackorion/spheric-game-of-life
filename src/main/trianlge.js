module.exports = class Triangle {
    constructor(row, index) {
        this.row = row;
        this.index = index;
        this.linkedTriangles = new Map();
        this.directions = { right: "left", left: "right", top: "bottom", bottom: "top" };
    }

    getRow() {
        return this.row;
    }

    getIndex() {
        return this.index;
    }

    linked(direction) {
        return this.linkedTriangles.get(direction);
    }

    setLinked(direction, triangle) {
        this.linkedTriangles.set(direction, triangle);

        if ( triangle.linked(this.directions[direction]) !== this )
            triangle.setLinked(this.directions[direction], this);
    }
};