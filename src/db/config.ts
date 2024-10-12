import Database from 'better-sqlite3';

const db = new Database('database.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS supplier (
        id INTEGER PRIMARY KEY,
        name TEXT,
        document TEXT,
        contact TEXT,
        address TEXT
    );
    
    CREATE TABLE IF NOT EXISTS product (
        id INTEGER PRIMARY KEY,
        name TEXT,
        description TEXT,
        price REAL,
        quantity INTEGER,
        image TEXT,
        supplier_id INTEGER,
        FOREIGN KEY (supplier_id) REFERENCES supplier(id)
    );
    
    CREATE TABLE IF NOT EXISTS customer (
        id INTEGER PRIMARY KEY,
        name TEXT,
        document TEXT,
        contact TEXT,
        address TEXT
    );

    CREATE TABLE IF NOT EXISTS order (
        id INTEGER PRIMARY KEY,
        data TEXT,
        customer_id INTEGER,
        status TEXT,
        total REAL,
        FOREIGN KEY (customer_id) REFERENCES customer(id)
    );

    CREATE TABLE IF NOT EXISTS order_item (
        id INTEGER PRIMARY KEY,
        order_id INTEGER,
        product_id INTEGER,
        quantity INTEGER,
        unit_price REAL,
        FOREIGN KEY (order_id) REFERENCES order(id),
        FOREIGN KEY (product_id) REFERENCES product(id)
    );

    CREATE TABLE IF NOT EXISTS transaction (
        id INTEGER PRIMARY KEY,
        data TEXT,
        tipo TEXT,
        valor REAL,
        product_id INTEGER,
        order_id INTEGER,
        FOREIGN KEY (product_id) REFERENCES product(id),
        FOREIGN KEY (order_id) REFERENCES order(id)
    );

    CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT,
        password TEXT
    );
`);

export default db;
