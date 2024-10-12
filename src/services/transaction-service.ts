import { Transaction } from "@/types/transaction";

// should fetch from an external API in the future
export class TransactionService {

    findById(id: number): Transaction | null {
        const transaction = this.list().filter(transaction => transaction.id === id).at(0);
        return transaction === undefined ? null : transaction;
    }

    list(): Transaction[] {
        return JSON.parse(localStorage.getItem("transactions") || "[]");
    }

    listRecents(): Transaction[] {
        return JSON.parse(localStorage.getItem("expenses") || "[]");
    }

    deleteById(id: number): boolean {
        const transaction = this.findById(id);

        if (!transaction) {
            return false;
        }

        return removeDataFromLocalStore("transactions", transaction);
    }

}

export const loadDataToLocalStorage = (key: string, data: Transaction[]) => {
    const existingData = localStorage.getItem(key);

    if (!existingData) {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    }

    return false;
};

export const removeDataFromLocalStore = (key: string, transactionToRemove: Transaction) => {
    const existingData = localStorage.getItem(key);

    if (existingData) {
        const existingTransactions: Transaction[] = JSON.parse(existingData);

        const updatedTransactions = existingTransactions.filter(transaction => transaction.id !== transactionToRemove.id);

        if (existingTransactions.length !== updatedTransactions.length) {
            localStorage.setItem(key, JSON.stringify(updatedTransactions));
            return true;
        }
    }

    return false;
}