export class Ship {
  constructor(shipLength, shipName) {
    this.shipName = shipName;

    this.shipLength = shipLength;
    this.timesHit = 0;
    this.hasBeenSunk = false;
    this.shipLocation = [];
    this.shipHitLocation = [];
  }

  logInfo() {
    console.log(this.shipLength, this.timesHit, this.hasBeenSunk);
  }

  incrementHit() {
    this.timesHit++;
    this.checkIfSunk(); // added check after each hit
  }

  checkIfSunk() {
    if (this.timesHit >= this.shipLength) {
      this.hasBeenSunk = true;
    }
  }
}
