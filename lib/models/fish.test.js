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

    it('finds a fish by id', async() => {
        const salmon = await Fish.insert({
            name: 'Salmon',
            color: 'pink',
            weight: 5
        });

        const foundSalmon = await Fish.findById(salmon.id);

        expect(foundSalmon).toEqual({
            id: salmon.id,
            name: 'Salmon',
            color: 'pink',
            weight: 5
        });
    });
    
    it('returns null if no fish matches id', async() => {
        const fish = await Fish.findById(99999);

        expect(fish).toEqual(null);
    });

    it('finds all fish', async() => {
        await Promise.all([
            Fish.insert({
                name: 'Swordfish',
                color: 'blue',
                weight: 15
            }),
            Fish.insert({
                name: 'Tuna',
                color: 'blue',
                weight: 25
            }),
            Fish.insert({
                name: 'Goldfish',
                color: 'Orange',
                weight: 1
            })
          ]); 

          const fish = await Fish.find();

          expect(fish).toEqual(expect.arrayContaining([
              {                name: 'Swordfish',
              color: 'blue',
              weight: 15, id: expect.any(String)},
              {                name: 'Tuna',
              color: 'blue',
              weight: 25, id: expect.any(String)},
              {                name: 'Goldfish',
              color: 'Orange',
              weight: 1, id: expect.any(String)}
          ]));
          

    })

    it('updates a row by id', async() => {
        const createdFish = await Fish.insert({
          name: 'Salmon',
          color: 'pink',
          weight: 15
        })

        const updatedFish = await Fish.update(createdFish.id, {
          name: 'Giant Salmon',
          color: 'pink',
          weight: 200
        })

        expect(updatedFish).toEqual({
          id: createdFish.id,
          name: 'Giant Salmon',
          color: 'pink',
          weight: 200
        })
    })

    it('deletes a row by id', async() => {
        const createdFish = await Fish.insert({
            name: 'Giant Salmon',
            color: 'pink',
            weight: 200
          });

        const deletedFish = await Fish.delete(createdFish.id)

        expect(deletedFish).toEqual({
            id: createdFish.id,
            name: 'Giant Salmon',
            color: 'pink',
            weight: 200
        })
    })
    
});