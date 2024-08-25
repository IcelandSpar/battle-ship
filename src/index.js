import { Gameboard } from './gameboard.js'
import './styles.css'
import {  populateBoard, changeMessage } from './dom.js'
import { Game, startGame } from './game-logic.js'


const NewGame = new Game();
NewGame.displayBoards()
let horizontal = false;

const htmlShips = Array.from(document.querySelector('.ship-options-container').children);
htmlShips.forEach(optionShip => optionShip.addEventListener('dragstart', dragStart));

let draggedShip = '';

function dragStart(x) {
    draggedShip = x.target.classList[0]
    console.log(draggedShip)
    const allPlayerCells = document.querySelectorAll('.grid1 .cell-rows .cell');
allPlayerCells.forEach(playerCell =>  {
    playerCell.addEventListener('drop', dropShip);
    playerCell.addEventListener('dragover', dragOver);
    
})
}

function dragOver(e) {
    e.preventDefault();
}

function dropShip(e) {
    let targetId = e.target;
    console.log(targetId)
    
    let capitalString = draggedShip[0].toUpperCase() + draggedShip.slice(1);
    if(capitalString == 'Battleship')  {
        capitalString = 'BattleShip'
    }
    NewGame.Human.gameboard.placeShip(parseInt(targetId.classList[0][5]) , parseInt(targetId.classList[0][4]), NewGame.Human.gameboard[capitalString], horizontal)
    NewGame.displayBoards();
    console.log(NewGame.Human.gameboard.board)
    document.querySelector(`.${draggedShip}-preview`).remove();
}



const randomPlaceBtn = document.querySelector('.random-place');
randomPlaceBtn.addEventListener('click', () => {

    NewGame.Human.gameboard.addShipToRandomLocation();
    NewGame.displayBoards();
    if(document.querySelector('.battleship-preview')) {
        document.querySelector('.battleship-preview').classList.remove('battleship-preview')
        document.querySelector('.carrier-preview').classList.remove('carrier-preview')
        document.querySelector('.submarine-preview').classList.remove('submarine-preview')
        document.querySelector('.destroyer-preview').classList.remove('destroyer-preview')
        document.querySelector('.cruiser-preview').classList.remove('cruiser-preview')
    }

})

const startGameBtn = document.querySelector('.start-game')
const turn = document.querySelector('.turn')
turn.addEventListener('click', () => {
    if (horizontal == true) {
        horizontal = false
    } else {
        horizontal = true;
    }
})

startGameBtn.addEventListener('click', () => {
    NewGame.Computer.gameboard.addShipToRandomLocation();
    changeMessage('GameStarted ! Your turn !')
    
    randomPlaceBtn.remove()
    startGameBtn.remove()
    turn.remove()
    document.querySelector('.ship-options-container').remove()
    NewGame.displayBoards()

    document.addEventListener('click', e => {
    
        let x = 0;
        let y = 0;
        if(e.target.matches('.cell')) {
           
            
            x = e.target.classList[0][14]
            y = e.target.classList[0][13]
            
    
            NewGame.Computer.gameboard.receiveAttack(x, y)
            document.querySelector(`.computer-cell${y}${x}`).classList.add = 'attack'
            
            NewGame.displayBoards()
            
            NewGame.Human.gameboard.receiveAttack(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10))
            NewGame.displayHitAttacks()
              
            if(NewGame.Computer.gameboard.checkIfAllSunk()) {
                changeMessage('All enemy ships are sunk !\nYou Won !')
                NewGame.displayComputerShips()
            }

            if(NewGame.Human.gameboard.checkIfAllSunk()) {
                changeMessage('All of your ships are sunk !\nGame Over !')
                NewGame.displayComputerShips()
            }
        }
        
        
    
    })
})






