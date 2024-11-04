import db from "server/db";
import { Product } from "shared/types/product";

export const getAllProducts = (): Product[] => {
    const stmt = db.prepare("SELECT * FROM kf_product");

    return stmt.all() as Product[];
};

export const getProductById = (id: number): Product | undefined => {
    const stmt = db.prepare("SELECT * FROM kf_product WHERE id = ?");

    return stmt.get(id) as Product | undefined;
};

export const addProduct = (product: Omit<Product, "id">): Product => {
    const { name, description, price, quantity, image, supplierId } = product;
    const stmt = db.prepare(
        "INSERT INTO kf_product (name, description, price, quantity, image, supplier_id) VALUES (?, ?, ?, ?, ?, ?)"
    );
    const info = stmt.run(name, description, price, quantity, image, supplierId);

    return { id: info.lastInsertRowid as number, ...product };
};

export const updateProduct = (id: number, product: Omit<Product, "id">): void => {
  const { name, description, price, quantity, image, supplierId } = product;
    const stmt = db.prepare(
        "UPDATE kf_product SET name = ?, description = ?, price = ?, quantity = ?, image = ?, supplier_id = ? WHERE id = ?"
    );

    stmt.run(name, description, price, quantity, image, supplierId, id);
};

export const deleteProduct = (id: number): void => {
    const stmt = db.prepare("DELETE FROM kf_product WHERE id = ?");

    stmt.run(id);
};
