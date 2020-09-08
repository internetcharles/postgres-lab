const fs = require('fs');
const pool = require('../utils/pool');

describe('pizza model', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });

    it('insert new pizza into database', async() => {
        
    })
})