
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

}

module.exports = Game;