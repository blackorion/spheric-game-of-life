import * as CELLS from './megacells'

var megacells = CELLS.megacells;

export function generateCells(T) {
    let cells = [];

    for ( let i = 0; i < 20 * parseInt(Math.pow(4, T)); ++i )
        cells.push({
            state: false,
            links: []
        });

    let c = 0;
    const cell_max = parseInt(Math.pow(4, T));
    const side_max = parseInt(Math.pow(2, T)) - 1;

    for ( let M = 0; M < 20; ++M ) { // M for megacell
        for ( let t = 0; t < parseInt(Math.pow(2, T)); ++t ) { // "row"
            let r = parseInt(Math.pow(2, T + 1)) - (1 + t) * 2; // number of elements in the row
            for ( let n = 0; n <= r; ++n ) { // position within a row
                if ( n % 2 ) {
                    cells[c].links.push(c - 1);
                    cells[c].links.push(c + 1);
                    cells[c].links.push(c + r);
                }
                else {
                    if ( n != 0 ) cells[c].links.push(c - 1);
                    if ( n != r ) cells[c].links.push(c + 1);
                    if ( t != 0 )cells[c].links.push(c - (r + 2));
                }
                c++;
            }
        }

        switch ( megacells[M].rL ) {
            case 0:
                for ( let i = 0; i <= side_max; ++i )
                    cells[i * 2 + cell_max * M].links.push((side_max - i) * 2 + cell_max * megacells[M].L);
                break;
            case 1:
                for ( let i = 0; i <= side_max; ++i )
                    cells[i * 2 + cell_max * M].links.push(parseInt(Math.pow(4, T)) - 1 - parseInt(Math.pow(parseInt(Math.pow(2, T)) - (side_max - i) - 1, 2)) + cell_max * megacells[M].L);
                break;
            case 2:
                for ( let i = 0; i <= side_max; ++i )
                    cells[i * 2 + cell_max * M].links.push(parseInt(Math.pow(4, T)) - 1 - (side_max - i) * ((side_max - i) + 2) + cell_max * megacells[M].L);
                break;
        }

        switch ( megacells[M].rB ) {
            case 0:
                for ( let i = 0; i <= side_max; ++i )
                    cells[parseInt(Math.pow(4, T)) - 1 - parseInt(Math.pow(parseInt(Math.pow(2, T)) - i - 1, 2)) + cell_max * M].links.push((side_max - i) * 2 + cell_max * megacells[M].B);
                break;
            case 1:
                for ( let i = 0; i <= side_max; ++i )
                    cells[parseInt(Math.pow(4, T)) - 1 - parseInt(Math.pow(parseInt(Math.pow(2, T)) - i - 1, 2)) + cell_max * M].links.push(parseInt(Math.pow(4,
                            T)) - 1 - parseInt(Math.pow(parseInt(Math.pow(2, T)) - (side_max - i) - 1, 2)) + cell_max * megacells[M].B);
                break;
            case 2:
                for ( let i = 0; i <= side_max; ++i )
                    cells[parseInt(Math.pow(4, T)) - 1 - parseInt(Math.pow(parseInt(Math.pow(2, T)) - i - 1, 2)) + cell_max * M].links.push(parseInt(Math.pow(4,
                            T)) - 1 - (side_max - i) * ((side_max - i) + 2) + cell_max * megacells[M].B);
                break;
        }

        switch ( megacells[M].rR ) {
            case 0:
                for ( let i = 0; i <= side_max; ++i )
                    cells[parseInt(Math.pow(4, T)) - 1 - i * (i + 2) + cell_max * M].links.push((side_max - i) * 2 + cell_max * megacells[M].R);
                break;
            case 1:
                for ( let i = 0; i <= side_max; ++i )
                    cells[parseInt(Math.pow(4, T)) - 1 - i * (i + 2) + cell_max * M].links.push(parseInt(Math.pow(4, T)) - 1 - parseInt(Math.pow(parseInt(Math.pow(2,
                                T)) - (side_max - i) - 1, 2)) + cell_max * megacells[M].R);
                break;
            case 2:
                for ( let i = 0; i <= side_max; ++i )
                    cells[parseInt(Math.pow(4, T)) - 1 - i * (i + 2) + cell_max * M].links.push(parseInt(Math.pow(4,
                            T)) - 1 - (side_max - i) * ((side_max - i) + 2) + cell_max * megacells[M].R);
                break;
        }
    }

    return cells;
}
