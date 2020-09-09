const pool = require("../utils/pool");
const Pizza = require("./pizza");

class Fish {
    id;
    name;
    color;
    weight;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.color = row.color;
        this.weight = row.weight;
    }

    static async insert(fish) {
        const { rows } = await pool.query(
            'INSERT INTO fish (name, color, weight) VALUES ($1, $2, $3) RETURNING *',
            [fish.name, fish.color, fish.weight]
        );

        return new Fish(rows[0])
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM fish WHERE id = $1',
            [id]
        );

        if (!rows[0]) return null;
        else return new Fish(rows[0]);
    };

    static async find() {
        const { rows } = await pool.query(
            'SELECT * FROM fish'
        );

        return rows.map(row => new Fish(row));
    }

}

module.exports = Fish