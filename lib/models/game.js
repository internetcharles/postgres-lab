
const pool = require('../utils/pool');


class Game {
 
    id;
    title;
    genre;
    rating;

    constructor(row) {
        this.id = row.id;
        this.title = row.title;
        this.genre = row.genre;
        this.rating = row.rating;
    }

    static async insert(game) {
        const { rows } = await pool.query(
            'INSERT INTO games (title, genre, rating) VALUES ($1, $2, $3) RETURNING *',
            [game.title, game.genre, game.rating]
        );

        return new Game(rows[0]);
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM games WHERE id=$1',
            [id]
        );
        
        if (!rows[0]) return null;
        else return new Game(rows[0]);
    };

    static async find() {
        const { rows } = await pool.query(
            'SELECT * FROM pizzas'
        );

        return rows.map(row => new Game(row))
    }

    static async update(id, updatedGame) {
        const { rows } = await pool.query(
            `UPDATE games
            SET title=$1,
                genre=$2,
                rating=$3
            WHERE id=$4
            RETURNING *`,
            [updatedGame.title, updatedGame.genre, updatedGame.rating, id]
        );
        return new Game(rows[0]);
    }

}

module.exports = Game;