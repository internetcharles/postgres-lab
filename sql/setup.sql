DROP TABLE IF EXISTS pizzas;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS sandwiches;


CREATE TABLE pizzas (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    toppings INT,
    price INT CHECK (price > 0)
);

CREATE TABLE games (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    genre TEXT NOT NULL,
    rating INT CHECK (rating > 0)
);

CREATE TABLE sandwiches (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    price INT CHECK (price > 0)
);