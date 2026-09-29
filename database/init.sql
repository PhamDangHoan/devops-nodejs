CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(12, 2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price, quantity)
VALUES
('Laptop ASUS', 'Laptop phục vụ học tập và lập trình', 18000000, 10),
('Chuột Logitech', 'Chuột không dây', 650000, 20),
('Bàn phím cơ', 'Bàn phím cơ RGB', 1200000, 15);