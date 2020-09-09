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

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM sandwiches WHERE id = $1',
            [id]
        );

        if (!rows[0]) return null;
        else return new Sandwich(rows[0]);
    };

    static async find() {
        const { rows } = await pool.query(
            'SELECT * FROM sandwiches'
        );

        return rows.map(row => new Sandwich(row));
    }

    static async update(id, updatedSandwich) {
        const { rows } = await pool.query(
            `UPDATE sandwiches
            SET name=$1,
                ingredients=$2,
                price=$3
            WHERE id=$4
            RETURNING *`,
            [updatedSandwich.name, updatedSandwich.ingredients, updatedSandwich.price, id]
        );
        return new Sandwich(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM sandwiches WHERE id=$1 RETURNING *',
            [id]
        );

        return new Sandwich(rows[0]);
    }

}

module.exports = Sandwich;