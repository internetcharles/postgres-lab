const fs = require('fs');
const Pizza = require('./pizza');
const pool = require('../utils/pool');

describe('pizza model', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });

    it('insert new pizza into database', async() => {
        const createdPizza = await Pizza.insert({
            name: 'Pepperoni',
            toppings: 1,
            price: 15
        });

        const { rows } = await pool.query(
            'SELECT * FROM pizzas WHERE id = $1',
            [createdPizza.id]
        );

        expect(rows[0]).toEqual(createdPizza);
    });
})