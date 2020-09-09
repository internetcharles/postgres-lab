const fs = require('fs');
const Sandwich = require('./sandwich');
const pool = require('../utils/pool');

describe('sandwich mode', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });

    it('insert new sandwich into database', async() => {
        const createdSandwich = await Sandwich.insert({
            name: 'Ham',
            ingredients: 'Ham',
            price: 15
        });

        const { rows } = await pool.query(
            'SELECT * FROM sandwiches WHERE id = $1',
            [createdSandwich.id]
        );

        expect(rows[0]).toEqual(createdSandwich);
    });
})