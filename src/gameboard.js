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

    this.Carrier = new Ship(5, "Carrier");
    this.BattleShip = new Ship(4, "BattleShip");
    this.Cruiser = new Ship(3, "Cruiser");
    this.Submarine = new Ship(3, "Submarine");
    this.Destroyer = new Ship(2, "Destroyer");
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

  // Now records ship locations when placed
  checkOrientationAndPlace(x, y, NewShip, horizontal) {
    if (horizontal == true) {
      if (x <= 10 - NewShip.shipLength) {
        for (let i = 0; i < NewShip.shipLength; i++) {
          this.board[y][x + i] = 1;
          this.recordShipLocations(NewShip, x + i, y);
        }
      } else if (x >= 10 - NewShip.shipLength) {
        for (let j = 0; j < NewShip.shipLength; j++) {
          this.board[y][x - j] = 1;
          this.recordShipLocations(NewShip, x - j, y);
        }
      }
    } else {
      if (y <= 10 - NewShip.shipLength) {
        for (let i = 0; i < NewShip.shipLength; i++) {
          this.board[y + i][x] = 1;
          this.recordShipLocations(NewShip, x, y + i);
        }
      } else if (y >= 10 - NewShip.shipLength) {
        for (let j = 0; j < NewShip.shipLength; j++) {
          this.board[y - j][x] = 1;
          this.recordShipLocations(NewShip, x, y - j);
        }
      }
    }
  }

  recordShipLocations(NewShip, x, y) {
    NewShip.shipLocation.push([x, y]);
  }

  placeShip(x, y, NewShip, horizontal = true) {
    // checkTest
    if (!this.checkIfEmpty(x, y, NewShip.shipLength, horizontal)) {
      this.checkOrientationAndPlace(x, y, NewShip, horizontal);

      // if spot taken, advise to try again
    } else {
      return console.log(
        `Try again, spot taken !\nCorrdinates are not valid !\nX: ${
          x + 1
        }\nY: ${9 + 1 - y}`
      ); // should return calculated x and y coords
    }
  }

  receiveAttack(x, y) {
    let ships = [
      this.Carrier,
      this.BattleShip,
      this.Cruiser,
      this.Submarine,
      this.Destroyer,
    ];

    for (let i = 0; i < ships.length; i++) {
      for (let j = 0; j < ships[i].shipLocation.length; j++) {
        if (
          ships[i].shipLocation[j][0] == x &&
          ships[i].shipLocation[j][1] == y &&
          !this.checkIfLocationAlreadyHit(x, y, ships[i])
        ) {
          ships[i].incrementHit();
          ships[i].shipHitLocation.push([x, y]);
          this.board[y][x] = 6;

          return;
        }
      }
    }

    if (this.board[y][x] == 0) {
      this.missedAttacks.push([x, y]); // Sends missed attacks to variable
      this.board[y][x] = 6;
      // return console.log(`Location already hit, try again:\nX: ${x}\nY: ${y}`);
    }
  }

  checkIfLocationAlreadyHit(x, y, ship) {
    let wasAlreadyHit = false;
    for (let k = 0; k < ship.shipHitLocation.length; k++) {
      if (ship.shipHitLocation[k][0] == x && ship.shipHitLocation[k][1] == y)
        wasAlreadyHit = true;
    }
    return wasAlreadyHit;
  }

  checkIfAllSunk() {
    return (
      this.Carrier.hasBeenSunk &&
      this.BattleShip.hasBeenSunk &&
      this.Cruiser.hasBeenSunk &&
      this.Submarine.hasBeenSunk &&
      this.Destroyer.hasBeenSunk
    );
  }
}
