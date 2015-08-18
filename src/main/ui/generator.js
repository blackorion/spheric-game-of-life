import * as CELLS from './megacells'

var megacells = CELLS.megacells;

export function generateCells(T) {
	let cells = [];
	const cell_max = parseInt(Math.pow(4, T));
	const side_max = parseInt(Math.pow(2, T)) - 1;

	let edge_cells = [[],[],[]]; // L B R
	for(let x = 0; x <= side_max;++x){
		edge_cells[0].push(x*2);
		edge_cells[1].push(cell_max - 1 - parseInt(Math.pow(side_max - x, 2)));
		edge_cells[2].push(cell_max - 1 - x * (x + 2));
	}

	for ( let i = 0; i < 20 * cell_max; ++i )
		cells.push({
			state: false,
			links: []
		});

	for ( let M = 0; M < 20; ++M ) { // M for megacell
		for ( let t = 0; t <= side_max; ++t ) { // "row"
			let r = 2*(side_max-t); // max element in the row
			let c = cell_max*(M+1)-parseInt(Math.pow(side_max-t+1,2));
			for ( let n = 1; n <= r; n+=2 ) { // position within a row
				let y = c + n;
				cells[y].links.push(y - 1);
				cells[y].links.push(y + 1);
				cells[y].links.push(y + r);
				for(let d of cells[y].links) cells[d].links.push(y);
			}
		}

		for ( let i = 0,ii = side_max; i <= side_max; ++i,--ii ){
			cells[edge_cells[0][i] + cell_max * M].links.push(edge_cells[megacells[M].rL][ii]+ cell_max * megacells[M].L);
			cells[edge_cells[1][i] + cell_max * M].links.push(edge_cells[megacells[M].rB][ii]+ cell_max * megacells[M].B);
			cells[edge_cells[2][i] + cell_max * M].links.push(edge_cells[megacells[M].rR][ii]+ cell_max * megacells[M].R);
		}
	}

	return cells;
}
