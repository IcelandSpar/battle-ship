import { Gameboard } from './gameboard.js'

const NewBoard = new Gameboard();
NewBoard.placeShip(0, 0, NewBoard.Cruiser, true)
console.log(NewBoard.board)