import { TransactionService } from "@/services/transaction-service";
import { ActionResponse } from "@/types/action";
import { Transaction } from "shared/types/transaction";

const transactionService = new TransactionService();

export const fetchRecentExpenses = async (): Promise<ActionResponse> => {
  try {
    const transactions = await transactionService.listRecents();

    return {
      success: {
        message: "",
        data: transactions.data as Transaction[]
      }
    };
  } catch (error: any) {
    console.log(error);

    return {
      error: {
        message: "An error occurred when trying to search for transactions, please try again later",
        data: []
      }
    };
  }
}

export const fetchTransactions = async (): Promise<ActionResponse> => {
  try {
    const transactions = await transactionService.list();

    return {
      success: {
        message: "",
        data: transactions.data as Transaction[]
      }
    };
  } catch (error: any) {
    console.log(error);

    return {
      error: {
        message: "An error occurred when trying to search for transactions, please try again later",
        data: []
      }
    };
  }
}
