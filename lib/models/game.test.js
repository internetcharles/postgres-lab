const fs = require('fs');
const Game = require('./game');
const pool = require('../utils/pool');
const Pizza = require('./pizza');

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
    });

    it('finds a game by id', async() => {
        const game = await Game.insert({
            title: 'Bint Quest',
            genre: 'RPG',
            rating: 6
        });

        const foundGame = await Game.findById(game.id);

        expect(foundGame).toEqual({
            id: foundGame.id,
            title: 'Bint Quest',
            genre: 'RPG',
            rating: 6
        });
    });

    it('returns null if no dog matches id', async () => {
        const game = await Game.findById(999);
        expect(game).toEqual(null);
    })

    it('finds all game', async() => {
        await Promise.all([
            {title: 'Bint Quest',
            genre: 'RPG',
            rating: 6},
            {title: 'Rint Quest',
            genre: 'Action RPG',
            rating: 3},
            {title: 'Mint Quest',
            genre: 'Mint Game',
            rating: 1}
        ]);

        const games = await Game.find();
    });

    it('updates a row by id', async () => {
        const createdGame = await Game.insert({
            title: 'Bint Quest',
            genre: 'FPS',
            rating: 10
        })

        const updatedGame = await Game.update(createdGame.id, {
            title: 'Bints Quests',
            genre: 'Strategy',
            rating: 8
        })

        expect(updatedGame).toEqual({
            title: 'Bints Quests',
            genre: 'Strategy',
            rating: 8,
            id: createdGame.id
        })
    })

    it('deletes a game', async () => {
        const createdGame = await Game.insert({
            title: 'Bint Quest',
            genre: 'RPG',
            rating: 6
        });
        const deletedGame = await Game.delete(createdGame.id)

        expect(deletedGame).toEqual({
            id: createdGame.id,
            title: 'Bint Quest',
            genre: 'RPG',
            rating: 6
        });
    });
    
});