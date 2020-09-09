const fs = require('fs');
const Player = require('./player');
const pool = require('../utils/pool');

describe('player model', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });

    it('inserts new player into database', async() => {
        const createdPlayer = await Player.insert({
            name: 'John John',
            ppg: 50,
            weight: 300
        });

        const { rows } = await pool.query(
            'SELECT * FROM players WHERE id = $1',
            [createdPlayer.id]
        );

        expect(rows[0]).toEqual(createdPlayer);
    });

    it('finds a player by id', async () => {
        const john = await Player.insert({
            name: 'John',
            ppg: 25,
            weight: 150
        });

        const foundPlayer = await Player.findById(john.id);

        expect(foundPlayer).toEqual({
            id: john.id,
            name: 'John',
            ppg: 25,
            weight: 150
        });


    })

    it('returns null if no player matches id', async() => {
        const player = await Player.findById(99999);

        expect(player).toEqual(null);
    });

    it('finds all players', async() => {
        await Promise.all([
            Player.insert({
                name: 'Paul',
                ppg: 1,
                weight: 94
            }),
            Player.insert({
                name: 'Charlie',
                ppg: 5,
                weight: 1000
            })
        ]);

        const players = await Player.find();

        expect(players).toEqual(expect.arrayContaining([
            {name: 'Paul', ppg: 1, weight: 94, id: expect.any(String)},
            {name: 'Charlie', ppg: 5, weight: 1000, id: expect.any(String)}
        ]));
    });

    it('updates a row by id', async() => {
        const createdPlayer = await Player.insert({
          name: 'John',
          ppg: 1,
          weight: 160
        })

        const updatedPlayer = await Player.update(createdPlayer.id, {
          name: 'John Jr',
          ppg: 100,
          weight: 200
        })

        expect(updatedPlayer).toEqual({
          id: createdPlayer.id,
          name: 'John Jr',
          ppg: 100,
          weight: 200
        })
    })

    it('deletes a row by id', async() => {
        const createdPlayer = await Player.insert({
            name: 'John Jr',
            ppg: 100,
            weight: 200
          });

        const deletedPlayer = await Player.delete(createdPlayer.id)

        expect(deletedPlayer).toEqual({
            id: createdPlayer.id,
            name: 'John Jr',
            ppg: 100,
            weight: 200
        })
    })
})