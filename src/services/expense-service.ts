import { Transaction } from "@/types/transaction";

// should fetch from an external API in the future
export class ExpenseService {

    findById(id: number): Transaction | null {
        const expense = this.list().filter(e => e.id === id).at(0);
        return expense === undefined ? null : expense;
    }

    list(): Transaction[] {
        return JSON.parse(localStorage.getItem("expenses") || "[]");
    }

    listRecents(): Transaction[] {
        return JSON.parse(localStorage.getItem("expenses") || "[]");
    }

}

export const loadDataToLocalStorage = (key: string, data: Transaction[]) => {
    const existingData = localStorage.getItem(key);

    if (!existingData) {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    }

    return false;
}
