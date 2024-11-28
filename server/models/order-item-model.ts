import db from "server/db";
import { OrderItem } from "shared/types/order";
import { Product } from "shared/types/product";

export const getAllOrderItems = (): OrderItem[] => {
    const stmt = db.prepare(`
        SELECT
            oi.id,
            oi.order_id,
            oi.quantity,
            oi.unit_price,
            p.id AS product_id,
            p.name AS product_name,
            p.description AS product_description,
            p.price AS product_price,
            p.quantity AS product_quantity,
            p.image AS product_image,
            p.supplier_id AS product_supplier_id
        FROM kf_order_item oi
            INNER JOIN kf_product p ON oi.product_id = p.id
    `);

    const rows = stmt.all() as {
        id: number;
        order_id: number;
        quantity: number;
        unit_price: number;
        product_id: number;
        product_name: string;
        product_description: string;
        product_price: number;
        product_quantity: number;
        product_image: string;
        product_supplier_id: number;
    }[];

    return rows.map((row) => ({
        id: row.id,
        orderId: row.order_id,
        quantity: row.quantity,
        unitPrice: row.unit_price,
        product: {
            id: row.product_id,
            name: row.product_name,
            description: row.product_description,
            price: row.product_price,
            quantity: row.product_quantity,
            image: row.product_image,
            supplierId: row.product_supplier_id
        } as Product,
    })) as OrderItem[];
}

export const getOrderItemsByOrderId = (id: number): OrderItem[] | undefined => {
    const stmt = db.prepare(`
        SELECT
            oi.id,
            oi.order_id,
            oi.quantity,
            oi.unit_price,
            p.id AS product_id,
            p.name AS product_name,
            p.description AS product_description,
            p.price AS product_price,
            p.quantity AS product_quantity,
            p.image AS product_image,
            p.supplier_id AS product_supplier_id
        FROM kf_order_item oi
            INNER JOIN kf_product p ON oi.product_id = p.id
        WHERE oi.order_id = ?
    `);

    const rows = stmt.all(id) as {
        id: number,
        order_id: number,
        quantity: number,
        unit_price: number,
        product_id: number,
        product_name: string,
        product_description: string,
        product_price: number,
        product_quantity: number,
        product_image: string,
        product_supplier_id: number,
    }[];

    return rows.map((row) => ({
        id: row.id,
        orderId: row.order_id,
        quantity: row.quantity,
        unitPrice: row.unit_price,
        product: {
            id: row.product_id,
            name: row.product_name,
            description: row.product_description,
            price: row.product_price,
            quantity: row.product_quantity,
            image: row.product_image,
            supplierId: row.product_supplier_id
        } as Product,
    })) as OrderItem[];
}

export const addOrderItem = (orderItem: Omit<OrderItem, "id">): OrderItem => {
    const { orderId, product, quantity, unitPrice } = orderItem;
    const stmt = db.prepare(
        "INSERT INTO kf_order_item (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)"
    )
    const info = stmt.run(orderId, product.id, quantity, unitPrice);

    return { id: info.lastInsertRowid as number, ...orderItem };
}

export const updateOrderItem = (id: number, orderItem: Omit<OrderItem, "id">): void => {
    const { orderId, product, quantity, unitPrice } = orderItem;
    const stmt = db.prepare(
        "UPDATE kf_order_item SET order_id = ?, product_id = ?, quantity = ?, unit_price = ? WHERE id = ?"
    )

    stmt.run(orderId, product.id, quantity, unitPrice, id);
}

export const deleteOrderItem = (id: number): void => {
    const stmt = db.prepare("DELETE FROM kf_order_item WHERE id = ?");

    stmt.run(id)
}

export const batchDeleteOrderItems = (ids: number[]): void => {
    if (ids.length === 0) {
        return;
    }

    const placeholders = ids.map(() => "?").join(", ");
    const stmt = db.prepare(`DELETE FROM kf_order_item WHERE id IN (${placeholders})`)

    stmt.run(...ids);
}