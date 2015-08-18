module.exports = class WorldMapMapper {
    map(map) {
        var elements = [];

        elements.push(map.get(0, 0));
        elements.push(map.get(0, 1));
        elements.push(map.get(0, 2));
        elements.push(map.get(0, 3));
        elements.push(map.get(0, 4));
        elements.push(map.get(1, 3));
        elements.push(map.get(1, 1));
        elements.push(map.get(1, 3));
        elements.push(map.get(1, 9));
        elements.push(map.get(1, 7));
        elements.push(map.get(1, 5));
        elements.push(map.get(2, 1));
        elements.push(map.get(2, 0));
        elements.push(map.get(2, 4));
        elements.push(map.get(2, 3));
        elements.push(map.get(2, 2));
        elements.push(map.get(1, 2));
        elements.push(map.get(1, 0));
        elements.push(map.get(1, 8));
        elements.push(map.get(1, 6));
        elements.push(map.get(1, 4));

        return elements;
    }
};