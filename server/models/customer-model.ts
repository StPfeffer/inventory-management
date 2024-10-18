import db from "server/db";
import { Customer } from "shared/types/customer";

export const getAllCustomers = (): Customer[] => {
    const stmt = db.prepare('SELECT * FROM kf_customer');

    return stmt.all() as Customer[];
};

export const getCustomerById = (id: number): Customer | undefined => {
    const stmt = db.prepare('SELECT * FROM kf_customer WHERE id = ?');

    return stmt.get(id) as Customer | undefined;
};

export const addCustomer = (customer: Omit<Customer, 'id'>): Customer => {
    const { name, document, contact, address } = customer;
    const stmt = db.prepare(
        'INSERT INTO kf_customer (name, document, contact, address) VALUES (?, ?, ?, ?)'
    );
    const info = stmt.run(name, document, contact, address);

    return { id: info.lastInsertRowid as number, ...customer };
};

export const updateCustomer = (id: number, customer: Omit<Customer, 'id'>): void => {
    const { name, document, contact, address } = customer;
    const stmt = db.prepare(
        'UPDATE kf_customer SET name = ?, document = ?, contact = ?, address = ? WHERE id = ?'
    );

    stmt.run(name, document, contact, address, id);
};

export const deleteCustomer = (id: number): void => {
    const stmt = db.prepare('DELETE FROM kf_customer WHERE id = ?');

    stmt.run(id);
};
