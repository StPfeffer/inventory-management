import db from "server/db";
import { Supplier } from "shared/types/supplier";

export const getAllSuppliers = (): Supplier[] => {
    const stmt = db.prepare("SELECT * FROM kf_supplier");

    return stmt.all() as Supplier[];
};

export const getSupplierById = (id: number): Supplier | undefined => {
    const stmt = db.prepare("SELECT * FROM kf_supplier WHERE id = ?");

    return stmt.get(id) as Supplier | undefined;
};

export const addSupplier = (supplier: Omit<Supplier, "id">): Supplier => {
    const { name, document, contact, address } = supplier;
    const stmt = db.prepare(
        "INSERT INTO kf_supplier (name, document, contact, address) VALUES (?, ?, ?, ?)"
    );
    const info = stmt.run(name, document, contact, address);

    return { id: info.lastInsertRowid as number, ...supplier };
};

export const updateSupplier = (id: number, supplier: Omit<Supplier, "id">): void => {
    const { name, document, contact, address } = supplier;
    const stmt = db.prepare(
        "UPDATE kf_supplier SET name = ?, document = ?, contact = ?, address = ? WHERE id = ?"
    );

    stmt.run(name, document, contact, address, id);
};

export const deleteSupplier = (id: number): void => {
    const stmt = db.prepare("DELETE FROM kf_supplier WHERE id = ?");

    stmt.run(id);
};
