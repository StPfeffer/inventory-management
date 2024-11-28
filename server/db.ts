import DatabaseConstructor, { Database } from "better-sqlite3";

function openDb(filename: string): Database {
    const db: Database = new DatabaseConstructor(filename, {
        verbose: console.log
    });

    return db;
}

function columnExists(tableName: string, columnName: string): boolean {
    const tableInfo = db.prepare(`PRAGMA table_info(${tableName});`).all();
    return tableInfo.some((column: any) => column.name === columnName);
}

const db = openDb("inventory.db");

try {
    db.exec(`
        CREATE TABLE IF NOT EXISTS kf_supplier (
            id INTEGER PRIMARY KEY,
            name TEXT,
            document TEXT,
            contact TEXT,
            address TEXT
        );
        
        CREATE TABLE IF NOT EXISTS kf_product (
            id INTEGER PRIMARY KEY,
            name TEXT,
            description TEXT,
            price REAL,
            quantity INTEGER,
            image TEXT,
            supplier_id INTEGER,
            FOREIGN KEY (supplier_id) REFERENCES kf_supplier(id)
        );
        
        CREATE TABLE IF NOT EXISTS kf_customer (
            id INTEGER PRIMARY KEY,
            name TEXT,
            document TEXT,
            contact TEXT,
            address TEXT
        );

        CREATE TABLE IF NOT EXISTS kf_order (
            id INTEGER PRIMARY KEY,
            data TEXT,
            customer_id INTEGER,
            status TEXT,
            total REAL,
            FOREIGN KEY (customer_id) REFERENCES kf_customer(id)
        );

        CREATE TABLE IF NOT EXISTS kf_order_item (
            id INTEGER PRIMARY KEY,
            order_id INTEGER,
            product_id INTEGER,
            quantity INTEGER,
            unit_price REAL,
            FOREIGN KEY (order_id) REFERENCES kf_order(id),
            FOREIGN KEY (product_id) REFERENCES kf_product(id)
        );

        CREATE TABLE IF NOT EXISTS kf_transaction (
            id INTEGER PRIMARY KEY,
            date TEXT,
            type TEXT,
            price REAL,
            product_id INTEGER NULL,
            order_id INTEGER NULL,
            FOREIGN KEY (product_id) REFERENCES kf_product(id),
            FOREIGN KEY (order_id) REFERENCES kf_order(id)
        );

        CREATE TABLE IF NOT EXISTS kf_user (
            id INTEGER PRIMARY KEY,
            name TEXT,
            email TEXT,
            password TEXT
        );

        CREATE UNIQUE INDEX IF NOT EXISTS kf_user_unq ON kf_user(email);
        CREATE UNIQUE INDEX IF NOT EXISTS kf_supplier_unq ON kf_supplier(document);
        CREATE UNIQUE INDEX IF NOT EXISTS kf_customer_unq ON kf_customer(document);
    `);
    if (columnExists('kf_order', 'data')) {
        db.exec(`
            CREATE TABLE kf_order_new (
                id INTEGER PRIMARY KEY,
                customer_id INTEGER,
                date TEXT,
                total REAL,
                status TEXT
            );
        `);
        db.exec(`
            INSERT INTO kf_order_new (id, customer_id, date, total, status)
            SELECT id, customer_id, data, total, status FROM kf_order;
        `);
        db.exec(`DROP TABLE kf_order;`);
        db.exec(`ALTER TABLE kf_order_new RENAME TO kf_order;`);
    }
} catch (error) {
    console.error("Error creating tables:", error);
}

export default db;
