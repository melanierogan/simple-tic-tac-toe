const items = document.getElementsByTagName('span');
const board = document.querySelector('.board');
const button = document.getElementsByTagName('button')[0];
const winStatus = document.getElementsByTagName('h1')[0];

let turn = 0;
let boardItems = [];

const winConditions = [
	
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	
	[0, 4, 8],
	[2, 4, 6]
	
];

class Tile {
	
	// constructor is used for setting up the variables
	constructor (cell, index) {
		
		// set initial content as empty
		this.content = '';
		
		// this is the cell itself
		this.container = cell;
		
		this.index = index;
		
		this.initialize();
		
	}
	
	addContent () {
        this.container.innerHTML = this.content;
	}
	
	clickHandler () {
		
		if ( this.content === '' ) {
			
			if ( turn === 0 ) {
				this.content = 'X';
				turn = 1;
			} else {
				this.content = 'O';
				turn = 0;
			}
			
			boardItems[this.index] = turn;
			
		}
		
		return this.addContent();
		
	}
	
	initialize () {
		this.container.addEventListener('click', this.clickHandler.bind(this));
	}
}

for (let i = 0; i < items.length; i++) {
	
	// pass in the cell and index
	items[i] = new Tile(items[i], i);
	
}

function checkWin() {
	
	let winner;
	
	for ( let condition of winConditions ) {
		
		if ( boardItems[condition[0]] === boardItems[condition[1]]
    		&& boardItems[condition[0]] === boardItems[condition[2]]
		    && boardItems[condition[0]] !== undefined ) {
			
			if ( turn === 0 ) {
				winner = 'O';
			} else {
				winner = 'X';
			}
			
			board.classList.add('finished');
		
	    	winStatus.innerHTML = `${winner} Wins!`;
			
	    }
		
	}
	
}

board.addEventListener('click', checkWin);

function resetGame() {
	turn = 0;
	boardItems = [];
	
	board.classList.remove('finished');
	
	winStatus.innerHTML = '';
	
	for (let i = 0; i < items.length; i++) {
		
		let newItem = document.createElement('span');
	
	    items[i].parentNode.replaceChild(newItem, items[i]);
		
		// pass in the cell and index
    	items[i] = new Tile(items[i], i);
	
    }

}

button.addEventListener('click', resetGame, false);