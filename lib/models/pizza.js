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
                [pizza.name, pizza.age, pizza.weight]
            );

            return new Pizza(rows[0]);
        }

    }

    module.exports = Pizza;