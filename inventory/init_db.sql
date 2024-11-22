Django==3.2.25
djangorestframework==3.12.4

-- Создание таблицы для хранения товаров
CREATE TABLE inventory_item (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INTEGER DEFAULT 0,
    price DECIMAL(10, 2) NOT NULL
);

-- Создание таблицы для хранения поставок
CREATE TABLE inventory_supply (
    id SERIAL PRIMARY KEY,
    item_id INTEGER REFERENCES inventory_item(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    supply_date TIMESTAMP NOT NULL
);

-- Создание таблицы для хранения отгрузок
CREATE TABLE inventory_shipment (
    id SERIAL PRIMARY KEY,
    item_id INTEGER REFERENCES inventory_item(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    shipment_date TIMESTAMP NOT NULL
);