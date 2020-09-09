const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Fish = require('../lib/models/fish')

describe('postgres-lab routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'))
  });

  it('create a new fish via POST', async() => {
    const response = await request(app)
      .post('/api/v1/fish')
      .send({ name: 'Salmon', color: 'pink', weight: '15' });
  
  expect(response.body).toEqual({
    id: expect.any(String),
    name: 'Salmon',
    color: 'pink',
    weight: 15
  });

  
  });

  it('deletes a fish by id via DELETE', async() => {
    const createdFish = await Fish.insert({
      name: 'Swordfish',
      color: 'blue',
      weight: 105
    });

    const response = await request(app)
      .delete(`/api/v1/fish/${createdFish.id}`);

    expect(response.body).toEqual({
      id: createdFish.id,
      name: 'Swordfish',
      color: 'blue',
      weight: 105
    });
  });
});
