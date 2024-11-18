import db from "server/db";
import { Transaction } from "shared/types/transaction";

export const getAllTransactions = (): Transaction[] => {
    const stmt = db.prepare("SELECT * FROM kf_transaction");

    return stmt.all() as Transaction[];
};

export const getAllExpenses = (): Transaction[] => {
    const stmt = db.prepare("SELECT * FROM kf_transaction WHERE type = 'exit'");

    return stmt.all() as Transaction[];
};

export const getAllIncomes = (): Transaction[] => {
    const stmt = db.prepare("SELECT * FROM kf_transaction WHERE type = 'entry'");

    return stmt.all() as Transaction[];
};

export const getTransactionById = (id: number): Transaction | undefined => {
    const stmt = db.prepare("SELECT * FROM kf_transaction WHERE id = ?");

    return stmt.get(id) as Transaction | undefined;
};

export const addTransaction = (transaction: Omit<Transaction, "id">): Transaction => {
    const { date, type, price, productId, orderId } = transaction;
    const stmt = db.prepare(
        "INSERT INTO kf_transaction (date, type, price, product_id, order_id) VALUES (?, ?, ?, ?, ?)"
    );
    const info = stmt.run(date, type, price, productId, orderId);

    return { id: info.lastInsertRowid as number, ...transaction };
};

export const updateTransaction = (id: number, transaction: Omit<Transaction, "id">): void => {
  const { date, type, price, productId, orderId } = transaction;
    const stmt = db.prepare(
        "UPDATE kf_transaction SET date = ?, type = ?, price = ?, product_id = ?, order_id = ? WHERE id = ?"
    );

    stmt.run(date, type, price, productId, orderId, id);
};

export const deleteTransaction = (id: number): void => {
    const stmt = db.prepare("DELETE FROM kf_transaction WHERE id = ?");

    stmt.run(id);
};

export const batchDeleteTransaction = (ids: number[]): void => {
    if (ids.length === 0) {
        return;
    }

    const placeholders = ids.map(() => "?").join(", ");
    const stmt = db.prepare(`DELETE FROM kf_transaction WHERE id IN (${placeholders})`);

    stmt.run(...ids);
}