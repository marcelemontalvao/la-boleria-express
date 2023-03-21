CREATE TABLE cakes (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    price NUMERIC,
    description TEXT,
    image VARCHAR
);

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    address VARCHAR,
    phone VARCHAR
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    clientId INTEGER,
    cakeId INTEGER,
    quantity INTEGER,
    createdAt TIMESTAMP,
    totalPrice NUMERIC,
    FOREIGN KEY (clientId) REFERENCES clients(id),
    FOREIGN KEY (cakeId) REFERENCES cakes(id)
);

INSERT INTO 
    cakes (name, price, description, image) 
VALUES 
    ($1, $2, $3, $4) 

SELECT id FROM cakes WHERE name=$1

