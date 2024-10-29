import { TransactionService } from "@/services/transaction-service";
import { ActionResponse } from "@/types/action";
import { Transaction } from "shared/types/transaction";

const transactionService = new TransactionService();

export const createTransaction = async (transaction: Transaction): Promise<ActionResponse> => {
  try {
    const createdTransaction = await transactionService.save(transaction);

    return {
      success: {
        message: "Transaction has been created.",
        data: createdTransaction.data as Transaction
      }
    };
  } catch (error: any) {
    console.log(error);

    return {
      error: {
        message: "An error occurred when trying to create the transaction, please try again later",
        data: []
      }
    };
  }
}
