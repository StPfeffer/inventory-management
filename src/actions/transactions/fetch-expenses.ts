import { ExpenseService } from "@/services/expense-service";
import { Transaction } from "@/types/transaction";

const expenseService = new ExpenseService();

export function fetchRecentExpenses() {
    try {
        const expenses = expenseService.listRecents();

        return (expenses as Transaction[])
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5);
    } catch (error) {
        console.error(error);

        return [];
    }
}

export function fetchExpenses() {
    try {
        const expenses = expenseService.list();
        return expenses as [];
    } catch (error) {
        console.error(error);

        return [];
    }
}

export function fetchExpense(id: string): Transaction | null {
    try {
        const expense = expenseService.findById(Number.parseInt(id));

        return expense;
    } catch (error) {
        console.error(error);

        return null;
    }
}
