const pool = require("../utils/pool");

    class Pizza {
        id;
        name;
        toppings;
        price;

        constructor(row) {
            this.id = row.id;
            this.name = row.name;
            this.toppings = row.toppings;
            this.price = row.price;
        }
        
        static async insert(pizza) {
            const { rows } = await pool.query(
                'INSERT INTO pizzas (name, toppings, price) VALUES ($1, $2, $3) RETURNING *',
                [pizza.name, pizza.toppings, pizza.price]
            );

            return new Pizza(rows[0]);
        }

        static async findById(id) {
            const { rows } = await pool.query(
                'SELECT * FROM pizzas WHERE id = $1',
                [id]
            );

            if (!rows[0]) return null;
            else return new Pizza(rows[0]);
        };

        static async find() {
            const { rows } = await pool.query(
                'SELECT * FROM pizzas'
            );

            return rows.map(row => new Pizza(row));
        }

        static async update(id, updatedPizza) {
            const { rows } = await pool.query(
                `UPDATE pizzas
                SET name=$1,
                    toppings=$2,
                    price=$3
                WHERE id=$4
                RETURNING *`,
                [updatedPizza.name, updatedPizza.toppings, updatedPizza.price, id]
            );
            return new Pizza(rows[0]);
        }

        static async delete(id) {
            const { rows } = await pool.query(
                'DELETE FROM pizzas WHERE id=$1 RETURNING *',
                [id]
            );

            return new Pizza(rows[0]);
        }
    }

    module.exports = Pizza;