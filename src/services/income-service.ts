import { Transaction } from "@/types/transaction";

// should fetch from an external API in the future
export class IncomeService {

    findById(id: number): Transaction | null {
        const income = this.list().filter(transaction => transaction.id === id).at(0);
        return income === undefined ? null : income;
    }

    list(): Transaction[] {
        return JSON.parse(localStorage.getItem("incomes") || "[]");
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
