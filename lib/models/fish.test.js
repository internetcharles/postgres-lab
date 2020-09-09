const fs = require('fs');
const Fish = require('./fish');
const pool = require('../utils/pool');

describe('fish model', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });

    it('insert new fish into database', async() => {
        const createdFish = await Fish.insert({
            name: 'Salmon',
            color: 'Pink',
            weight: 15
        });

        const { rows } = await pool.query(
            'SELECT * FROM fish WHERE id = $1',
            [createdFish.id]
        );

        expect(rows[0]).toEqual(createdFish);
    });
});