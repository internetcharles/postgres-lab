DROP TABLE IF EXISTS pizzas;

CREATE TABLE pizzas (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    toppings INT,
    price INT CHECK (price > 0)
);