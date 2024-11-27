import db from "server/db";
import { Customer } from "shared/types/customer";
import { Order } from "shared/types/order";

export const getAllOrders = (): Order[] => {
    const stmt = db.prepare(`
        SELECT 
            o.id, 
            o.date, 
            o.status, 
            o.total, 
            c.id AS customer_id, 
            c.name AS customer_name, 
            c.contact AS customer_contact,
            c.document AS customer_document,
            c.address AS customer_address
        FROM kf_order o
            LEFT JOIN kf_customer c ON o.customer_id = c.id
    `);

    const rows = stmt.all() as {
        id: number;
        date: string;
        status: string;
        total: number;
        customer_id: number;
        customer_name: string;
        customer_contact: string;
        customer_document: string;
        customer_address: string;
    }[];

    return rows.map((row) => ({
        id: row.id,
        date: new Date(row.date),
        status: row.status,
        total: row.total,
        customer: {
            id: row.customer_id,
            name: row.customer_name,
            contact: row.customer_contact,
            document: row.customer_document,
            address: row.customer_address,
        } as Customer,
    })) as Order[];
}

export const getOrderById = (id: number): Order | undefined => {
    const stmt = db.prepare(`
        SELECT 
            o.id, 
            o.date, 
            o.status, 
            o.total, 
            c.id AS customer_id, 
            c.name AS customer_name, 
            c.contact AS customer_contact,
            c.document AS customer_document,
            c.address AS customer_address
        FROM kf_order o
            LEFT JOIN kf_customer c ON o.customer_id = c.id
        WHERE o.id = ?
    `);

    const row = stmt.get(id) as {
        id: number;
        date: string;
        status: string;
        total: number;
        customer_id: number;
        customer_name: string;
        customer_contact: string;
        customer_document: string;
        customer_address: string;
    };

    return {
        id: row.id,
        date: new Date(row.date),
        status: row.status,
        total: row.total,
        customer: {
            id: row.customer_id,
            name: row.customer_name,
            contact: row.customer_contact,
            document: row.customer_document,
            address: row.customer_address,
        } as Customer,
    } as Order;
}

export const addOrder = (order: Omit<Order, "id">): Order => {
    const { date, customer, status, total } = order;
    const stmt = db.prepare(
        "INSERT INTO kf_order (date, customer_id, status, total) VALUES (?, ?, ?, ?)"
    )
    const info = stmt.run(date, customer.id, status, total);

    return { id: info.lastInsertRowid as number, ...order };
}

export const updateOrder = (id: number, order: Omit<Order, "id">): void => {
    const { date, customer, status, total } = order;
    const stmt = db.prepare(
        "UPDATE kf_order SET date = ?, customer_id = ?, status = ?, total = ? WHERE id = ?"
    )

    stmt.run(date, customer.id, status, total, id);
}

export const deleteOrder = (id: number): void => {
    const stmt = db.prepare("DELETE FROM kf_order WHERE id = ?");

    stmt.run(id)
}

export const batchDeleteOrder = (ids: number[]): void => {
    if (ids.length === 0) {
        return;
    }

    const placeholders = ids.map(() => "?").join(", ");
    const stmt = db.prepare(`DELETE FROM kf_order WHERE id IN (${placeholders})`)

    stmt.run(...ids);
}
