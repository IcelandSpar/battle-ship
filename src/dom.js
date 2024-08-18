import { Game } from './game-logic'
import { Gameboard } from './gameboard.js'

const GridDomRef = {
    humanGrid: document.querySelector('.grid1'),
    computerGrid: document.querySelector('.grid2'),
    message: document.querySelector('.message'),

}
export function populateBoard(board) {
    GridDomRef.humanGrid.textContent = '';
    for(let i = 0; i < board.length; i++) {
        let cellRow = document.createElement('div');
        cellRow.classList.add('cell-rows')
        GridDomRef.humanGrid.appendChild(cellRow);
        for(let j = 0; j < board[i].length; j++) {
            let cell = document.createElement('div');
            cell.classList.add(`cell${i}${j}`, 'cell')
            cell.textContent = board[i][j]
            cellRow.appendChild(cell)
        }
    }

}

export function populateComputerBoard(board) {
    GridDomRef.computerGrid.textContent = '';
    for(let i = 0; i < board.length; i++) {
        let cellRow = document.createElement('div');
        cellRow.classList.add(`computer-cell-row${i}`, 'cell-rows')
        GridDomRef.computerGrid.appendChild(cellRow);
        for(let j = 0; j < board[i].length; j++) {
            let cell = document.createElement('div');
            cell.classList.add(`computer-cell${i}${j}`, 'cell')
            cell.textContent = board[i][j];
            // addButtonsToCells(cell)
            cellRow.appendChild(cell)
            
        }
    }
}



// function addButtonsToCells(cell, x, y) { // , x, y, board // add this later

//     cell.addEventListener('click', () => {
        
//         cell.style.cssText = 'background-color: green;'
//         console.log(x, y)

//     })
//     // cell.addEventListener('mouseover', () => {
//     //     cell.style.cssText = 'background-color: red;'
        
//     // })

//     // cell.addEventListener('mouseleave', () => {
//     //      cell.style.cssText = 'background-color: white;'
        
//     // })
   
// }

export function changeMessage(messageText) {
    GridDomRef.message.textContent = messageText;
}



