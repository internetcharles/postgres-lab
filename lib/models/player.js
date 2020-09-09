const pool = require("../utils/pool")

class Player {
    id;
    name;
    ppg;
    weight;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.ppg = row.ppg;
        this.weight = row.weight;
    }

    static async insert(player) {
        const { rows } = await pool.query(
            'INSERT INTO players (name, ppg, weight) VALUES ($1, $2, $3) RETURNING *',
            [player.name, player.ppg, player.weight]
        );

        return new Player(rows[0]);
    }
}

module.exports = Player;