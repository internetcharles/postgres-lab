const pool = require("../utils/pool");

class Sandwich {
    id;
    name;
    ingredients;
    price;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.ingredients = row.ingredients;
        this.price = row.price;
    }

    static async insert(sandwich) {
        const { rows } = await pool.query(
            'INSERT INTO sandwiches (name, ingredients, price) VALUES ($1, $2, $3) RETURNING *',
            [sandwich.name, sandwich.ingredients, sandwich.price]
        );

        return new Sandwich(rows[0]);
    }
}

module.exports = Sandwich;