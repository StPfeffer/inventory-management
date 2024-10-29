import { ExpenseService } from "@/services/expense-service";
import { ActionResponse } from "@/types/action";
import { Transaction } from "shared/types/transaction";

const expenseService = new ExpenseService();

export const fetchRecentExpenses = async (): Promise<ActionResponse> => {
    try {
        const expenses = await expenseService.listRecents();

        return {
            success: {
                message: "",
                data: expenses.data as Transaction[]
            }
        };
    } catch (error: any) {
        console.log(error);

        return {
            error: {
                message: "An error occurred when trying to search for expenses, please try again later",
                data: []
            }
        };
    }
}

export const fetchExpenses = async (): Promise<ActionResponse> => {
    try {
        const expenses = await expenseService.list();

        return {
            success: {
                message: "",
                data: expenses.data as Transaction[]
            }
        };
    } catch (error: any) {
        console.log(error);

        return {
            error: {
                message: "An error occurred when trying to search for expenses, please try again later",
                data: []
            }
        };
    }
}
