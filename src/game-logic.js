import { Player } from './player.js'
import { populateBoard, populateComputerBoard, changeMessage, GridDomRef } from './dom.js'


export class Game {
    constructor() {
        this.Human = new Player('human');
        this.Computer = new Player('computer');
        this.playerTurn = 1;
        this.horizontal = true;
    }

    displayBoards() {
        populateBoard(this.Human.gameboard.board)
        populateComputerBoard(this.Computer.gameboard.board)
    }

    startGame() {

    }

    

}

export function startGame() {


    const NewGame = new Game();
    NewGame.displayBoards();
    
    NewGame.Human.gameboard.addShipToRandomLocation()
    NewGame.Computer.gameboard.addShipToRandomLocation()
    // NewGame.Human.gameboard.placeShip(5, 2, NewGame.Human.gameboard.Carrier, false)

    
    NewGame.displayBoards();
    console.table(NewGame.Human.gameboard.board)
    console.table(NewGame.Computer.gameboard.board)
}

async function addShip(GameObj, ship) {
    for(let i = 0; i < 10; i++) {
        for(let k = 0; k < 10; k++) {
            
            document.querySelector(`.cell${k}${i}`).addEventListener('click', () => {
                 GameObj.Human.gameboard.placeShip(i, k, ship, GameObj.horizontal)
                GameObj.displayBoards();
                
            })
            
        }
    }
}



const flipButton = document.querySelector('.turn');
const shipOptionsContainer = document.querySelector('.ship-options-container');

flipButton.addEventListener('click', () => {
   Array.from(shipOptionsContainer.children).forEach((item) => {
        if(item.style.transform == 'rotate(90deg)') {
            item.style.transform = 'rotate(0deg)';
        } else {
            item.style.transform = 'rotate(90deg)';
        }
   })
})