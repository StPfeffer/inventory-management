import {
    Request,
    Response
} from "express";
import {
    addTransaction,
    deleteTransaction,
    getAllTransactions,
    getAllExpenses,
    getAllIncomes,
    getTransactionById,
    updateTransaction
} from "server/models/transaction-model";

export const getTransactions = (req: Request, res: Response) => {
    const { type } = req.query;

    if (type === "exit") {
        return getExpenses(req, res);
    }
    if (type === "entry") {
        return getIncomes(req, res);
    }

    const transactions = getAllTransactions();
    res.json(transactions);
};

export const getExpenses = (_req: Request, res: Response) => {
    const expenses = getAllExpenses();
    res.json(expenses);
};

export const getIncomes = (_req: Request, res: Response) => {
    const incomes = getAllIncomes();
    res.json(incomes);
};

export const getTransaction = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const transaction = getTransactionById(id);
    if (transaction) {
        res.json(transaction);
    } else {
        res.status(404).json({ error: "Transaction not found" });
    }
};

export const createTransaction = (req: Request, res: Response) => {
    const { date, type, price, productId, orderId } = req.body;
    const newTransaction = addTransaction({ date, type, price, productId, orderId });
    res.status(201).json(newTransaction);
};

export const editTransaction = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { date, type, price, productId, orderId } = req.body;
    updateTransaction(id, { date, type, price, productId, orderId });
    res.status(204).send();
};

export const removeTransaction = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    deleteTransaction(id);
    res.status(204).send();
};
