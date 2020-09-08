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

    it('finds a pizza by id', async() => {
        const pepperoni = await Pizza.insert({
            name: 'Pepperoni',
            price: 15,
            toppings: 1
        });

        const foundPepperoni = await Pizza.findById(pepperoni.id);

        expect(foundPepperoni).toEqual({
            id: pepperoni.id,
            name: 'Pepperoni',
            toppings: 1,
            price: 15
        });
    });
    
    it('returns null if no dog matches id', async() => {
        const pizza = await Pizza.findById(99999);

        expect(pizza).toEqual(null);
    });

    it('finds all pizzas', async() => {
        await Promise.all([
            Pizza.insert({
                name: 'Pepperoni',
                toppings: 1,
                price: 15
            }),
            Pizza.insert({
                name: 'Cheese',
                toppings: 0,
                price: 10
            }),
            Pizza.insert({
                name: 'Margherita',
                toppings: 1,
                price: 10
            })
          ]); 

          const pizzas = await Pizza.find();

          expect(pizzas).toEqual(expect.arrayContaining([
              {name: 'Pepperoni', toppings: 1, price: 15, id: expect.any(String)},
              {name: 'Cheese', toppings: 0, price: 10, id: expect.any(String)},
              {name: 'Margherita', toppings: 1, price: 10, id: expect.any(String)}
          ]))
    })
    
})