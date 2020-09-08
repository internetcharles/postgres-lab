const fs = require('fs');
const Game = require('./game');
const pool = require('../utils/pool');

describe('game model', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });
    
    it('inserts a game into the db', async() => {
        const createdGame = await Game.insert({
            title: 'Bint Quest',
            genre: 'RPG',
            rating: 6
        });

        const { rows } = await pool.query(
            'SELECT * FROM games WHERE id = $1',
            [createdGame.id]
            );

            expect(rows[0]).toEqual(createdGame)
    })
    
})