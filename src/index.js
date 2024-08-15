import { Gameboard } from './gameboard.js'

const NewBoard = new Gameboard();
NewBoard.placeShip(0, 0, NewBoard.Cruiser);
NewBoard.placeShip(9, 9, NewBoard.Destroyer);
NewBoard.receiveAttack(0, 0);
NewBoard.receiveAttack(0, 0);
NewBoard.receiveAttack(5, 5);
NewBoard.receiveAttack(6, 5);
console.log(NewBoard.missedAttacks)
console.table(NewBoard.board)