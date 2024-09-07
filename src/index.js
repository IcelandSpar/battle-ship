import { Gameboard } from './gameboard.js'
import './styles.css'
import {  populateBoard, changeMessage } from './dom.js'
import { Game, startGame } from './game-logic.js'

function startNewGameInfo() {
    const NewGame = new Game();
    NewGame.displayBoards()
    let horizontal = false;
    let gameEnded = false;
    changeMessage('Place Your Ships!')
    Array.from(document.querySelector('.ship-options-container').children).forEach(child => {
        child.style.transform = 'rotate(0deg)'
    })




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
    document.querySelector(`.${draggedShip}-preview`).style.display = 'none';
}



const randomPlaceBtn = document.querySelector('.random-place');
randomPlaceBtn.addEventListener('click', () => {

    NewGame.Human.gameboard.addShipToRandomLocation();
    NewGame.displayBoards();
    if(document.querySelector('.battleship-preview')) {
        document.querySelector('.battleship-preview').style.display = 'none';
        document.querySelector('.carrier-preview').style.display = 'none';
        document.querySelector('.submarine-preview').style.display = 'none';
        document.querySelector('.destroyer-preview').style.display = 'none';
        document.querySelector('.cruiser-preview').style.display = 'none';
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
    changeMessage('Game Started! Attack!')
    
    randomPlaceBtn.style.display = 'none';
    startGameBtn.style.display = 'none';
    turn.style.display = 'none';
    document.querySelector('.ship-options-container').style.display = 'none';
    NewGame.displayBoards()


    document.addEventListener('click', e => {
    
        let x = 0;
        let y = 0;
        if(e.target.matches('.cell') && !gameEnded) {
           
            
            x = e.target.classList[0][14]
            y = e.target.classList[0][13]
            
            if(gameEnded == false) {
            NewGame.Computer.gameboard.receiveAttack(x, y)
            document.querySelector(`.computer-cell${y}${x}`).classList.add = 'attack'
            }

            
            NewGame.displayBoards()
            let computerAttackXCoord = Math.floor(Math.random() * 10);
            let computerAttackYCoord = Math.floor(Math.random() * 10);
            while(NewGame.Human.gameboard.board[computerAttackYCoord][computerAttackXCoord] == 6 && gameEnded == false) {
                computerAttackXCoord = Math.floor(Math.random() * 10);
                computerAttackYCoord = Math.floor(Math.random() * 10);
                
            }
            if(gameEnded == false) {
                NewGame.Human.gameboard.receiveAttack(computerAttackXCoord, computerAttackYCoord)
            }
            
            NewGame.displayHitAttacks()
              
            if(NewGame.Computer.gameboard.checkIfAllSunk()) {
                changeMessage('All enemy ships are sunk !\nYou Won !')
                NewGame.displayComputerShips()
                gameEnded = true;

                let restartBtn = document.createElement('button');
                restartBtn.textContent = "Restart Game";
                document.querySelector('.buttons').appendChild(restartBtn)

                restartBtn.addEventListener('click', ()=> {
                    
                    randomPlaceBtn.style.display = 'block';
                    startGameBtn.style.display = 'block';
                    turn.style.display = 'block';
                    document.querySelector('.ship-options-container').style.display = 'flex';
                    
                    NewGame.Human.gameboard.board = [
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      ];

                      NewGame.Computer.gameboard.board = [
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      ];
                      console.log(NewGame.Human.gameboard.board, NewGame.Computer.gameboard.board)
                      restartBtn.remove()
                      document.querySelector('.battleship-preview').style.display = 'flex';
                      document.querySelector('.carrier-preview').style.display = 'flex';
                      document.querySelector('.submarine-preview').style.display = 'flex';
                      document.querySelector('.destroyer-preview').style.display = 'flex';
                      document.querySelector('.cruiser-preview').style.display = 'flex';
                      NewGame.Human.gameboard.Carrier.hasBeenSunk = false;
                      NewGame.Human.gameboard.Carrier.timesHit = 0;
                      NewGame.Human.gameboard.Carrier.shipLocation = [];
                      NewGame.Human.gameboard.Carrier.shipHitLocation = [];
                      
                      NewGame.Human.gameboard.BattleShip.hasBeenSunk = false;
                      NewGame.Human.gameboard.BattleShip.timesHit = 0;
                      NewGame.Human.gameboard.BattleShip.shipLocation = [];
                      NewGame.Human.gameboard.BattleShip.shipHitLocation = [];

                      NewGame.Human.gameboard.Cruiser.hasBeenSunk = false;
                      NewGame.Human.gameboard.Cruiser.timesHit = 0;
                      NewGame.Human.gameboard.Cruiser.shipLocation = [];
                      NewGame.Human.gameboard.Cruiser.shipHitLocation = [];

                      NewGame.Human.gameboard.Submarine.hasBeenSunk = false;
                      NewGame.Human.gameboard.Submarine.timesHit = 0;
                      NewGame.Human.gameboard.Submarine.shipLocation = [];
                      NewGame.Human.gameboard.Submarine.shipHitLocation = [];

                      NewGame.Human.gameboard.Destroyer.hasBeenSunk = false;
                      NewGame.Human.gameboard.Destroyer.timesHit = 0;
                      NewGame.Human.gameboard.Destroyer.shipLocation = [];
                      NewGame.Human.gameboard.Destroyer.shipHitLocation = [];

                      NewGame.Human.gameboard.missedAttacks = [];

                      NewGame.Computer.gameboard.Carrier.hasBeenSunk = false;
                      NewGame.Computer.gameboard.Carrier.timesHit = 0;
                      NewGame.Computer.gameboard.Carrier.shipLocation = [];
                      NewGame.Computer.gameboard.Carrier.shipHitLocation = [];
                      
                      NewGame.Computer.gameboard.BattleShip.hasBeenSunk = false;
                      NewGame.Computer.gameboard.BattleShip.timesHit = 0;
                      NewGame.Computer.gameboard.BattleShip.shipLocation = [];
                      NewGame.Computer.gameboard.BattleShip.shipHitLocation = [];

                      NewGame.Computer.gameboard.Cruiser.hasBeenSunk = false;
                      NewGame.Computer.gameboard.Cruiser.timesHit = 0;
                      NewGame.Computer.gameboard.Cruiser.shipLocation = [];
                      NewGame.Computer.gameboard.Cruiser.shipHitLocation = [];

                      NewGame.Computer.gameboard.Submarine.hasBeenSunk = false;
                      NewGame.Computer.gameboard.Submarine.timesHit = 0;
                      NewGame.Computer.gameboard.Submarine.shipLocation = [];
                      NewGame.Computer.gameboard.Submarine.shipHitLocation = [];

                      NewGame.Computer.gameboard.Destroyer.hasBeenSunk = false;
                      NewGame.Computer.gameboard.Destroyer.timesHit = 0;
                      NewGame.Computer.gameboard.Destroyer.shipLocation = [];
                      NewGame.Computer.gameboard.Destroyer.shipHitLocation = [];

                      NewGame.Computer.gameboard.missedAttacks = [];
                      startNewGameInfo();
                })

            }

            if(NewGame.Human.gameboard.checkIfAllSunk()) {
                changeMessage('All of your ships are sunk !\nGame Over !')
                NewGame.displayComputerShips()
                gameEnded = true;
                

                let restartBtn = document.createElement('button');
                restartBtn.textContent = "Restart Game";
                document.querySelector('.buttons').appendChild(restartBtn)

                restartBtn.addEventListener('click', ()=> {
                    
                    randomPlaceBtn.style.display = 'block';
                    startGameBtn.style.display = 'block';
                    turn.style.display = 'block';
                    document.querySelector('.ship-options-container').style.display = 'flex';
                    
                    NewGame.Human.gameboard.board = [
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      ];

                      NewGame.Computer.gameboard.board = [
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      ];
                      console.log(NewGame.Human.gameboard.board, NewGame.Computer.gameboard.board)
                      restartBtn.remove()
                      document.querySelector('.battleship-preview').style.display = 'flex';
                      document.querySelector('.carrier-preview').style.display = 'flex';
                      document.querySelector('.submarine-preview').style.display = 'flex';
                      document.querySelector('.destroyer-preview').style.display = 'flex';
                      document.querySelector('.cruiser-preview').style.display = 'flex';
                      NewGame.Human.gameboard.Carrier.hasBeenSunk = false;
                      NewGame.Human.gameboard.Carrier.timesHit = 0;
                      NewGame.Human.gameboard.Carrier.shipLocation = [];
                      NewGame.Human.gameboard.Carrier.shipHitLocation = [];
                      
                      NewGame.Human.gameboard.BattleShip.hasBeenSunk = false;
                      NewGame.Human.gameboard.BattleShip.timesHit = 0;
                      NewGame.Human.gameboard.BattleShip.shipLocation = [];
                      NewGame.Human.gameboard.BattleShip.shipHitLocation = [];

                      NewGame.Human.gameboard.Cruiser.hasBeenSunk = false;
                      NewGame.Human.gameboard.Cruiser.timesHit = 0;
                      NewGame.Human.gameboard.Cruiser.shipLocation = [];
                      NewGame.Human.gameboard.Cruiser.shipHitLocation = [];

                      NewGame.Human.gameboard.Submarine.hasBeenSunk = false;
                      NewGame.Human.gameboard.Submarine.timesHit = 0;
                      NewGame.Human.gameboard.Submarine.shipLocation = [];
                      NewGame.Human.gameboard.Submarine.shipHitLocation = [];

                      NewGame.Human.gameboard.Destroyer.hasBeenSunk = false;
                      NewGame.Human.gameboard.Destroyer.timesHit = 0;
                      NewGame.Human.gameboard.Destroyer.shipLocation = [];
                      NewGame.Human.gameboard.Destroyer.shipHitLocation = [];

                      NewGame.Human.gameboard.missedAttacks = [];

                      NewGame.Computer.gameboard.Carrier.hasBeenSunk = false;
                      NewGame.Computer.gameboard.Carrier.timesHit = 0;
                      NewGame.Computer.gameboard.Carrier.shipLocation = [];
                      NewGame.Computer.gameboard.Carrier.shipHitLocation = [];
                      
                      NewGame.Computer.gameboard.BattleShip.hasBeenSunk = false;
                      NewGame.Computer.gameboard.BattleShip.timesHit = 0;
                      NewGame.Computer.gameboard.BattleShip.shipLocation = [];
                      NewGame.Computer.gameboard.BattleShip.shipHitLocation = [];

                      NewGame.Computer.gameboard.Cruiser.hasBeenSunk = false;
                      NewGame.Computer.gameboard.Cruiser.timesHit = 0;
                      NewGame.Computer.gameboard.Cruiser.shipLocation = [];
                      NewGame.Computer.gameboard.Cruiser.shipHitLocation = [];

                      NewGame.Computer.gameboard.Submarine.hasBeenSunk = false;
                      NewGame.Computer.gameboard.Submarine.timesHit = 0;
                      NewGame.Computer.gameboard.Submarine.shipLocation = [];
                      NewGame.Computer.gameboard.Submarine.shipHitLocation = [];

                      NewGame.Computer.gameboard.Destroyer.hasBeenSunk = false;
                      NewGame.Computer.gameboard.Destroyer.timesHit = 0;
                      NewGame.Computer.gameboard.Destroyer.shipLocation = [];
                      NewGame.Computer.gameboard.Destroyer.shipHitLocation = [];

                      NewGame.Computer.gameboard.missedAttacks = [];
                      startNewGameInfo();
                })
                
            }
        }
        
        
    
    })
})

}

startNewGameInfo();




