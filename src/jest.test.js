/* eslint-disable no-undef */

import { Ship } from './ship.js';
import { Gameboard } from './gameboard.js';
import { Player } from './player.js';

describe('Ship Methods', () => {

    const NewShip = new Ship(4)


    test('Ship length', () => {
        expect(NewShip.shipLength).toBe(4);
        
    })

    test('If hit increments', () => {
        NewShip.incrementHit()
        expect(NewShip.timesHit).toBe(1);
        
    })

    test('If ship is sunk after "length" amount of hits', () => {
        NewShip.incrementHit()
        NewShip.incrementHit()
        NewShip.incrementHit()

        expect(NewShip.hasBeenSunk).toBe(true);

    })

    test('If ship is hit 4 times after incrementHit() is called 4 times', () => {

        expect(NewShip.timesHit).toBe(4);
        
    })

})

describe('Gameboard Methods', () => {
    const NewBoard = new Gameboard();

    test('board is a 10x10 grid', () => {
        expect(NewBoard.board).toEqual([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          ])
    })

    test('Check if board is not 0', () => {
        expect(NewBoard.checkIfEmpty(0, 0, 4, true)).toBe(false)
    })

    test('Place horizontally on corner with appropriate ship size', () => {
        NewBoard.placeShip(0, 0, NewBoard.Carrier, true)
        expect(NewBoard.board).toEqual([
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          ])
    })

    test('Check if space is occupied by number other than 0', () => {
        expect(NewBoard.checkIfEmpty(0, 0, 5)).toBe(true)
    })

})


describe('board test', () => {
    const NewBoard = new Gameboard();
    test('If there are not enough spaces from the starting cooridnate (x), flip to opposite side', () => {
        
        NewBoard.placeShip(6, 0, NewBoard.Carrier)
        
        expect(NewBoard.board).toEqual([
            [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          ])
    })

    test('If ship can be placed vertically', () => {
        NewBoard.placeShip(0, 2, NewBoard.Carrier, false)
        expect(NewBoard.board).toEqual([
            [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          ])
    })

    test('If ship can be placed on bottom right corner and display right size', () => {
        NewBoard.placeShip(9, 9, NewBoard.BattleShip, true)
        expect(NewBoard.board).toEqual([
            [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
          ])
    })

    test('If attack was received, send hit to right ship', () => {
        NewBoard.receiveAttack(3, 0)
        expect(NewBoard.Carrier.timesHit).toBe(1)

        
        expect(NewBoard.board).toEqual([
            [0, 0, 1, 6, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
          ])

    })



})

describe('Attack on ship', () => {
    const NewBoard = new Gameboard()
    NewBoard.placeShip(0, 0, NewBoard.Cruiser)
    

    NewBoard.receiveAttack(0, 0, NewBoard.Cruiser)
    test('If correct ship was targeted', () => {
        expect(NewBoard.Cruiser.timesHit).toEqual(1)
        
    })

    test('If correct ship was targeted', () => {
        expect(NewBoard.BattleShip.timesHit).toEqual(0)
        
    })


    
    test('If correct ship was targeted', () => {
        expect(NewBoard.Submarine.timesHit).toEqual(0)
        
    })


    test('If correct ship was targeted', () => {
        expect(NewBoard.Destroyer.timesHit).toEqual(0)
        
    })

    
})


describe('Test for ship placement and attacks', () => {

    const NewBoard = new Gameboard();

    test('If boat placements are recorded', () => {
        NewBoard.placeShip(0, 0, NewBoard.Carrier)
        expect(NewBoard.Carrier.shipLocation).toEqual([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]])
    })
    
    test('If ship placed on right location', () => {
        expect(NewBoard.board).toEqual([
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          ])
    })

    test('If 2 ships are recorded', () => {
        NewBoard.placeShip(5, 5, NewBoard.Cruiser, false)
        expect(NewBoard.Cruiser.shipLocation).toEqual([[5, 5], [5, 6], [5, 7]])
        expect(NewBoard.Carrier.shipLocation).toEqual([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]])
    })


})

describe('Test if hit locations are recorded in correct ship and if ships are all sunk', () => {
    const NewBoard = new Gameboard();
    NewBoard.placeShip(0, 0, NewBoard.Cruiser);
    NewBoard.placeShip(9, 9, NewBoard.Destroyer);
    NewBoard.receiveAttack(0, 0);
    NewBoard.receiveAttack(0, 0);
    NewBoard.receiveAttack(5, 5);
    NewBoard.receiveAttack(6, 5);

    test('If hit is registered to correct ship', () => {
        expect(NewBoard.Cruiser.timesHit).toBe(1)
    }) 

    test('If hit is not registered to other ships', () => {
        expect(NewBoard.Destroyer.timesHit).toBe(0)
        expect(NewBoard.Carrier.timesHit).toBe(0)
        expect(NewBoard.Submarine.timesHit).toBe(0)
        expect(NewBoard.BattleShip.timesHit).toBe(0)
    }) 

    test('If missed hit is recorded', () => {
        expect(NewBoard.missedAttacks).toEqual([[5, 5], [6, 5]])
    })

    test('If ship is hit, it will save the location it was hit in on array (no repeats))', () => {
        expect(NewBoard.Cruiser.shipHitLocation).toEqual([[0, 0]])

    })
test('Gameboard displays number 6 for missed and hit shots', () => {
    expect(NewBoard.board).toEqual([
        [6, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 6, 6, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1]
    ])
})

    
})

describe('Test Player Classes', () => {
    const HumanPlayer = new Player('Human');
    const ComputerPlayer = new Player('Computer');

    test('Human Player has their own type', () => {
        expect(HumanPlayer.type).toBe('Human')
    })

    test('Human Player has own board', () => {
        expect(HumanPlayer.gameboard.board).toEqual([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ])
    })

    test('Computer Player shows correct type', () => {
        expect(ComputerPlayer.type).toBe('Computer')
    })

        test('Computer Player has own board', () => {
        expect(ComputerPlayer.gameboard.board).toEqual([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ])
    })
})