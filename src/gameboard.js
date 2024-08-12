import { Ship } from "./ship.js";

export class Gameboard {
  constructor() {
    this.board = [
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

    this.Carrier = new Ship(5);
    this.BattleShip = new Ship(4);
    this.Cruiser = new Ship(3);
    this.Submarine = new Ship(3);
    this.Destroyer = new Ship(2);
    this.missedAttacks = [];
    
  }

  logBoard() {
    console.log(this.board);
  }

  checkIfEmpty(x, y, shipLength, horizOrVert) {
    let searchSectionArr = [];
    if (horizOrVert == true) {
      if (x <= 10 - shipLength) {
        for (let i = 0; i < shipLength; i++) {
          searchSectionArr.push(this.board[y][x + i]);
        }
      } else if (x >= 10 - shipLength) {
        for (let j = 0; j < shipLength; j++) {
          searchSectionArr.push(this.board[y][x - j]);
        }
      }
    } else {
      if (y <= 10 - shipLength) {
        for (let i = 0; i < shipLength; i++) {
          searchSectionArr.push(this.board[y + i][x]);
        }
      } else if (y >= 10 - shipLength) {
        for (let j = 0; j < shipLength; j++) {
          searchSectionArr.push(this.board[y - j][x]);
        }
      }
    }
    return searchSectionArr.includes(1);
  }

  checkOrientationAndPlace(x, y, shipLength, horizontal) {
    if (horizontal == true) {
      if (x <= 10 - shipLength) {
        for (let i = 0; i < shipLength; i++) {
          this.board[y][x + i] = 1;
        }
      } else if (x >= 10 - shipLength) {
        for (let j = 0; j < shipLength; j++) {
          this.board[y][x - j] = 1;
        }
      }
    } else {
      if (y <= 10 - shipLength) {
        for (let i = 0; i < shipLength; i++) {
          this.board[y + i][x] = 1;
        }
      } else if (y >= 10 - shipLength) {
        for (let j = 0; j < shipLength; j++) {
          this.board[y - j][x] = 1;
        }
      }
    }
    
  }

  placeShip(x, y, NewShip, horizontal = true) {
    
    // checkTest
    if (!this.checkIfEmpty(x, y, NewShip.shipLength, horizontal)) {
      this.checkOrientationAndPlace(x, y, NewShip.shipLength, horizontal);

      // if spot taken, advise to try again
    } else {
      return console.log(
        `Try again, spot taken !\nCorrdinates are not valid !\nX: ${
          x + 1
        }\nY: ${9 + 1 - y}`
      ); // should return calculated x and y coords
    }
    
  }

  receiveAttack(x, y, obj) {
    this.board[y][x] = 6;
    obj.incrementHit()
    obj.timesHit
  }
}



//   // default is horizontal,
//   // --- horizontal = true,
//   // |   vertical = false;

//   // Maybe Each ship will have a number to identify:
//   // 3 space ship is 3, 3, 3
//   // 4 space ship is 4, 4, 4
//   // remember to change number in placeShip function
//   // checkIfEmpty might need to be changed for number changes
//   const NewBoard = new Gameboard();
//   NewBoard.placeShip(5, 5, 5, false)
//   NewBoard.placeShip(2, 5, 4)
//   NewBoard.placeShip(0, 0, 4, true)
//   NewBoard.placeShip(9, 0, 3, false)
//   NewBoard.placeShip(9, 8, 3, true)
//   NewBoard.placeShip(1, 6, 2, true)

//   NewBoard.logBoard()
