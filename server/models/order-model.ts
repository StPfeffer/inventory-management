import db from "server/db";
import { Order } from "shared/types/order";

export const getAllOrders = (): Order[] => {
    const stmt = db.prepare("SELEC * FROM kf_order");

    return stmt.all() as Order[];
}

export const getOrderById = (id: number): Order | undefined => {
    const stmt = db.prepare("SELECT * FROM kf_order WHERE id = ?");

    return stmt.get(id) as Order | undefined;
}

export const addOrder = (order: Omit<Order, "id">): Order => {
    const {date, customerId, status, total} = order;
    const stmt = db.prepare(
        "INSERT INTO kf_order (date, customerId, status, total) VALUES (?, ?, ?, ?)"
    )
    const info = stmt.run(date, customerId, status, total);

    return { id: info.lastInsertRowid as number, ...order};
}

export const upadateOrder = (id:number, order: Omit<Order, "id">):void => {
    const {date, customerId, status, total} = order;
    const stmt = db.prepare(
        "UPDATE kf_order SET date = ?, customerId = ?, status = ?, total = ? WHERE id = ?"
    )

    stmt.run(date, customerId, status, total, id);
}

export const deleteOrder = (id: number): void => {
    const stmt = db.prepare("DELETE FROM kf_order WHERE id = ?");

    stmt.run(id)
}

export const batchDeleteOrder = (ids:number[]): void => {
    if (ids.length === 0) {
        return;
    }

    const placeholders = ids.map(() => "?").join(", ");
    const stmt = db.prepare(`DELETE FROM kf_order WHERE id IN (${placeholders})`)

    stmt.run(...ids);
}
