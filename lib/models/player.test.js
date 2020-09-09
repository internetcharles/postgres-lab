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
})