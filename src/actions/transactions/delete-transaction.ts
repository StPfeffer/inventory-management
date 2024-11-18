import { TransactionService } from "@/services/transaction-service";
import { ActionResponse } from "@/types/action";

const transactionService = new TransactionService();

export const deleteTransaction = async (id: number): Promise<ActionResponse> => {
    try {
        await transactionService.delete(id);

        return {
            success: {
                message: "Transaction has been deleted.",
                data: null
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to delete the transaction, please try again later.",
                data: []
            }
        };
    }
}

export const batchDeleteTransaction = async (ids: number[]): Promise<ActionResponse> => {
    try {
        await transactionService.batchDelete(ids);

        return {
            success: {
                message: "All selected transactions have been successfully deleted.",
                data: null
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "Unable to delete the selected transactions at this time. Please check your network connection or try again later.",
                data: null
            }
        };
    }
}
