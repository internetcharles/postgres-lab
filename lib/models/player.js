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

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM players WHERE id = $1',
            [id]
        );

        if (!rows[0]) return null;
        else return new Player(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query(
            'SELECT * FROM players'
        );

        return rows.map(row => new Player(row));
    }

    static async update(id, updatedPlayer) {
        const { rows } = await pool.query(
            `UPDATE players
            SET name=$1,
                ppg=$2,
                weight=$3
            WHERE id=$4
            RETURNING *`,
            [updatedPlayer.name, updatedPlayer.ppg, updatedPlayer.weight, id]
        );
        return new Player(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM players WHERE id=$1 RETURNING *',
            [id]
        );

        return new Player(rows[0]);
    }
}

module.exports = Player;