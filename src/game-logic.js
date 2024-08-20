import { Player } from "./player.js";
import {
  populateBoard,
  populateComputerBoard,
  changeMessage,
  GridDomRef,
} from "./dom.js";

export class Game {
  constructor() {
    this.Human = new Player("human");
    this.Computer = new Player("computer");
    this.playerTurn = 1;
    this.horizontal = true;
  }

  displayBoards() {
    populateBoard(this.Human.gameboard.board);
    populateComputerBoard(this.Computer.gameboard.board);
    let ships = [
      this.Human.gameboard.Carrier,
      this.Human.gameboard.BattleShip,
      this.Human.gameboard.Cruiser,
      this.Human.gameboard.Destroyer,
      this.Human.gameboard.Submarine,
    ];
    ships.forEach((ship) => {
      for (let i = 0; i < ship.shipLocation.length; i++) {
        document
          .querySelector(
            `.cell${ship.shipLocation[i][1]}${ship.shipLocation[i][0]}`
          )
          .classList.add(ship.shipName.toLowerCase());
      }
    });

    // let computerShips = [
    //   this.Computer.gameboard.Carrier,
    //   this.Computer.gameboard.BattleShip,
    //   this.Computer.gameboard.Cruiser,
    //   this.Computer.gameboard.Destroyer,
    //   this.Computer.gameboard.Submarine,
    // ];
    // computerShips.forEach((ship) => {
    //   for (let i = 0; i < ship.shipLocation.length; i++) {
    //     document
    //       .querySelector(
    //         `.computer-cell${ship.shipLocation[i][1]}${ship.shipLocation[i][0]}`
    //       )
    //       .classList.add(ship.shipName.toLowerCase());
    //   }
    // });
  }

  displayHitAttacks() {
    let computerShips = [
      this.Computer.gameboard.Carrier,
      this.Computer.gameboard.BattleShip,
      this.Computer.gameboard.Cruiser,
      this.Computer.gameboard.Destroyer,
      this.Computer.gameboard.Submarine,
    ];

    computerShips.forEach((ship) => {
      for (let i = 0; i < ship.shipHitLocation.length; i++) {
        console.log(ship.shipHitLocation[i][0], ship.shipHitLocation[i][1]);
        document
          .querySelector(
            `.computer-cell${ship.shipHitLocation[i][1]}${ship.shipHitLocation[i][0]}`
          )
          .classList.add("attack");
      }
    });

    let ships = [
      this.Human.gameboard.Carrier,
      this.Human.gameboard.BattleShip,
      this.Human.gameboard.Cruiser,
      this.Human.gameboard.Destroyer,
      this.Human.gameboard.Submarine,
    ];

    ships.forEach((ship) => {
      for (let j = 0; j < ship.shipHitLocation.length; j++) {
        console.log(ship.shipHitLocation[j][0], ship.shipHitLocation[j][1]);
        document
          .querySelector(
            `.cell${ship.shipHitLocation[j][1]}${ship.shipHitLocation[j][0]}`
          )
          .classList.add("attack");
      }
    });

    this.Computer.gameboard.missedAttacks.forEach((item) => {
      document
        .querySelector(`.computer-cell${item[1]}${item[0]}`)
        .classList.add("missed-attack");
    });

    this.Human.gameboard.missedAttacks.forEach((item) => {
      document
        .querySelector(`.cell${item[1]}${item[0]}`)
        .classList.add("missed-attack");
    });
  }
}

export function startGame() {
  const NewGame = new Game();
  NewGame.displayBoards();

  NewGame.Computer.gameboard.addShipToRandomLocation();

  NewGame.displayBoards();
  return NewGame;
}

async function addShip(GameObj, ship) {
  for (let i = 0; i < 10; i++) {
    for (let k = 0; k < 10; k++) {
      document.querySelector(`.cell${k}${i}`).addEventListener("click", () => {
        GameObj.Human.gameboard.placeShip(i, k, ship, GameObj.horizontal);
        GameObj.displayBoards();
      });
    }
  }
}

const flipButton = document.querySelector(".turn");
const shipOptionsContainer = document.querySelector(".ship-options-container");

flipButton.addEventListener("click", () => {
  Array.from(shipOptionsContainer.children).forEach((item) => {
    if (item.style.transform == "rotate(90deg)") {
      item.style.transform = "rotate(0deg)";
    } else {
      item.style.transform = "rotate(90deg)";
    }
  });
});
