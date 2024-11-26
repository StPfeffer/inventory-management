import db from "server/db";
import { Order, OrderItem } from "shared/types/order";

//ORDER

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


//ORDER-ITEM

export const getAllOrderItems = (): OrderItem[] => {
    const stmt = db.prepare("SELEC * FROM kf_order_item");

    return stmt.all() as OrderItem[];
}

export const getOrderItemsByOrderId = (id: number): OrderItem[] | undefined => {
    const stmt = db.prepare("SELECT * FROM kf_order_item WHERE order_id = ?");

    return stmt.get(id) as OrderItem[] | undefined;
}

export const addOrderItem = (orderItem: Omit<OrderItem, "id">): OrderItem => {
    const {orderId, productId, quantity, unitPrice} = orderItem;
    const stmt = db.prepare(
        "INSERT INTO kf_order_item (orderId, productId, quantity, unitPrice) VALUES (?, ?, ?, ?)"
    )
    const info = stmt.run(orderId, productId, quantity, unitPrice);

    return { id: info.lastInsertRowid as number, ...orderItem};
}

export const upadateOrderItem = (id:number, orderItem: Omit<OrderItem, "id">):void => {
    const {orderId, productId, quantity, unitPrice} = orderItem;
    const stmt = db.prepare(
        "UPDATE kf_order_item SET orderId = ?, productId = ?, quantity = ?, unitPrice = ? WHERE id = ?"
    )

    stmt.run(orderId, productId, quantity, unitPrice, id);
}

export const deleteOrderItem = (id: number): void => {
    const stmt = db.prepare("DELETE FROM kf_order_item WHERE id = ?");

    stmt.run(id)
}

export const batchDeleteOrderItems = (ids:number[]): void => {
    if (ids.length === 0) {
        return;
    }

    const placeholders = ids.map(() => "?").join(", ");
    const stmt = db.prepare(`DELETE FROM kf_order_item WHERE id IN (${placeholders})`)

    stmt.run(...ids);
}