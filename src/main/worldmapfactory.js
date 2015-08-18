import WorldMap from './woldmap'
import Triangle from './trianlge'

module.exports = class WorldMapFactory {
    static generateRandom() {
        let triangles = WorldMapFactory.createDefaultTriangles();

        for(let triangle of triangles)
            if (Math.random() > 0.5)
                triangle.revive();

        return new WorldMap(triangles);
    }

    static create(level = 0) {
        let triangles = WorldMapFactory.createDefaultTriangles();

        if (level === 1)
            triangles = WorldMapFactory.divide(triangles);

        return new WorldMap(triangles);
    }

    static createDefaultTriangles() {
        var triangles = [
            new Triangle(0, 0),
            new Triangle(0, 1),
            new Triangle(0, 2),
            new Triangle(0, 3),
            new Triangle(0, 4),
            new Triangle(1, 0),
            new Triangle(1, 1),
            new Triangle(1, 2),
            new Triangle(1, 3),
            new Triangle(1, 4),
            new Triangle(1, 5),
            new Triangle(1, 6),
            new Triangle(1, 7),
            new Triangle(1, 8),
            new Triangle(1, 9),
            new Triangle(2, 0),
            new Triangle(2, 1),
            new Triangle(2, 2),
            new Triangle(2, 3),
            new Triangle(2, 4)
        ];

        triangles[0].setLinked("right", triangles[1]);
        triangles[1].setLinked("right", triangles[2]);
        triangles[2].setLinked("right", triangles[3]);
        triangles[3].setLinked("right", triangles[4]);
        triangles[4].setLinked("right", triangles[0]);

        triangles[0].setLinked("bottom", triangles[6]);
        triangles[1].setLinked("bottom", triangles[8]);
        triangles[2].setLinked("bottom", triangles[10]);
        triangles[3].setLinked("bottom", triangles[12]);
        triangles[4].setLinked("bottom", triangles[14]);

        triangles[5].setLinked("right", triangles[6]);
        triangles[6].setLinked("right", triangles[7]);
        triangles[7].setLinked("right", triangles[8]);
        triangles[8].setLinked("right", triangles[9]);
        triangles[9].setLinked("right", triangles[10]);
        triangles[10].setLinked("right", triangles[11]);
        triangles[11].setLinked("right", triangles[12]);
        triangles[12].setLinked("right", triangles[13]);
        triangles[13].setLinked("right", triangles[14]);
        triangles[14].setLinked("right", triangles[5]);

        triangles[5].setLinked("bottom", triangles[15]);
        triangles[7].setLinked("bottom", triangles[16]);
        triangles[9].setLinked("bottom", triangles[17]);
        triangles[11].setLinked("bottom", triangles[18]);
        triangles[13].setLinked("bottom", triangles[19]);

        triangles[15].setLinked("right", triangles[16]);
        triangles[16].setLinked("right", triangles[17]);
        triangles[17].setLinked("right", triangles[18]);
        triangles[18].setLinked("right", triangles[19]);
        triangles[19].setLinked("right", triangles[15]);

        return triangles;
    }

    static divide(triangles) {
        let result = [];

        for (let triangle of triangles) {
            result.push(new Triangle(triangle.getRow(), triangle.getIndex()));
            result.push(new Triangle(triangle.getRow() + 1, triangle.getIndex()));
            result.push(new Triangle(triangle.getRow() + 1, triangle.getIndex() + 1));
            result.push(new Triangle(triangle.getRow() + 1, triangle.getIndex() + 2));
        }

        return result;
    }

    static tessellate(triangle) {
        var tesselatedElement = {
            top: new Triangle,
            bottom: new Triangle,
            left: new Triangle,
            right: new Triangle
        };

        tesselatedElement.top.setLinked("bottom", tesselatedElement.bottom);

        return tesselatedElement
    }
};