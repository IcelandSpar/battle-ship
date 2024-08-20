import { Gameboard } from './gameboard.js'
import './styles.css'
import {  populateBoard, changeMessage } from './dom.js'
import { Game, startGame } from './game-logic.js'

// const NewBoard = new Gameboard();
// NewBoard.placeShip(0, 0, NewBoard.Cruiser);
// NewBoard.placeShip(9, 9, NewBoard.Destroyer);
// NewBoard.receiveAttack(0, 0);
// NewBoard.receiveAttack(0, 0);
// NewBoard.receiveAttack(5, 5);
// NewBoard.receiveAttack(6, 5);
// console.log(NewBoard.missedAttacks)
// console.table(NewBoard.board)

// makeGrids()

const NewGame = new Game();
NewGame.displayBoards()



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
            console.log(e.target.classList[0])
            
            x = e.target.classList[0][14]
            y = e.target.classList[0][13]
            console.log(x, y)
    
            NewGame.Computer.gameboard.receiveAttack(x, y)
            document.querySelector(`.computer-cell${y}${x}`).classList.add = 'attack'
            console.log(NewGame.Computer.gameboard.checkIfAllSunk())
            NewGame.displayBoards()
            
            NewGame.Human.gameboard.receiveAttack(Math.floor(Math.random() * 9), Math.floor(Math.random() * 9))
            NewGame.displayHitAttacks()
            if(NewGame.Computer.gameboard.checkIfAllSunk()) {
                changeMessage('All enemy ships are sunk !')
            }
        }
        
        
    
    })
})




// newBoard.placeShip(0, 0, newBoard.Carrier, true)
// newBoard.placeShip(0, 0, newBoard.Carrier, false)




