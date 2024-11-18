import { IncomeService } from "@/services/income-service";
import { ActionResponse } from "@/types/action";
import { Transaction } from "shared/types/transaction";

const incomeService = new IncomeService();

export const fetchRecentIncomes = async (): Promise<ActionResponse> => {
    try {
        const incomes = await incomeService.listRecents();

        return {
            success: {
                message: "",
                data: incomes.data as Transaction[]
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to search for incomes, please try again later",
                data: []
            }
        };
    }
}

export const fetchIncomes = async (): Promise<ActionResponse> => {
    try {
        const incomes = await incomeService.list();

        return {
            success: {
                message: "",
                data: incomes.data as Transaction[]
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to search for incomes, please try again later",
                data: []
            }
        };
    }
}
