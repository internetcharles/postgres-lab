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

    it('finds a sandwich by id', async() => {
        const fish = await Sandwich.insert({
            name: 'Fish',
            ingredients: 'Salmon',
            price: 50
        });

        const foundFish = await Sandwich.findById(fish.id);

        expect(foundFish).toEqual({
            id: fish.id,
            name: 'Fish',
            ingredients: 'Salmon',
            price: 50
        })
    })

    it('returns null if no sandwich matches id', async() => {
        const sandwich = await Sandwich.findById(99999);

        expect(sandwich).toEqual(null);
    });

    it('finds all sandwiches', async() => {
        await Promise.all([
            Sandwich.insert({
                name: 'Ham',
                ingredients: 'Ham',
                price: 5
            }),
            Sandwich.insert({
                name: 'Spam',
                ingredients: 'Spam',
                price: 5
            }),
            Sandwich.insert({
                name: 'Dam',
                ingredients: 'Dam',
                price: 5
            })
          ]); 

          const sandwiches = await Sandwich.find();

          expect(sandwiches).toEqual(expect.arrayContaining([
              {name: 'Ham', ingredients: 'Ham', price: 5, id: expect.any(String)},
              {name: 'Spam', ingredients: 'Spam', price: 5, id: expect.any(String)},
              {name: 'Dam', ingredients: 'Dam', price: 5, id: expect.any(String)}
          ]));
          

    });

    it('updates a row by id', async() => {
        const createdSandwich = await Sandwich.insert({
            name: 'Ham',
            ingredients: 'Ham',
            price: 5
        })

        const updatedSandwich = await Sandwich.update(createdSandwich.id, {
            name: 'Spam',
            ingredients: 'Spam',
            price: 5
        })

        expect(updatedSandwich).toEqual({
            id: createdSandwich.id,
            name: 'Spam',
            ingredients: 'Spam',
            price: 5
        })
    })

    it('deletes a row by id', async() => {
        const createdSandwich = await Sandwich.insert({
            name: 'Spam',
            ingredients: 'Spam',
            price: 5
        });

        const deletedSandwich = await Sandwich.delete(createdSandwich.id)

        expect(deletedSandwich).toEqual({
            id: createdSandwich.id,
            name: 'Spam',
            ingredients: 'Spam',
            price: 5
        });
    })
})