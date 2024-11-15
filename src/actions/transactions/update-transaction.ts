import { TransactionService } from "@/services/transaction-service";
import { ActionResponse } from "@/types/action";
import { Transaction } from "shared/types/transaction";

const transactionService = new TransactionService();

export const updateTransaction = async (id: number, transaction: Transaction): Promise<ActionResponse> => {
    try {
        const updatedTransaction = await transactionService.update(id, transaction);

        return {
            success: {
                message: "Transaction has been updated.",
                data: updatedTransaction.data as Transaction
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to update the transaction, please try again later",
                data: []
            }
        };
    }
}
