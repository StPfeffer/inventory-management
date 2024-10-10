

import { TransactionService } from "@/services/transaction-service";
import { Transaction } from "@/types/transaction";

const transactionService = new TransactionService();

export function fetchRecentTransactions(userId: number): Transaction[] {
  try {
    const transactions = transactionService.listByUser(userId);

    return (transactions as Transaction[])
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  } catch (error) {
    console.error(error);

    return [];
  }
}

export function fetchTransactions(userId: number) {
  try {
    const transactions = transactionService.listByUser(userId);

    return transactions as [];
  } catch (error) {
    console.error(error);

    return [];
  }
}

export function initializeTransactions(userId: number) {
  transactionService.initialize(userId);
}

export function fetchTransaction(id: string): Transaction | null {
  try {
    const transaction = transactionService.findById(Number.parseInt(id));

    return transaction;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export function deleteTransaction(id: number): void {
  try {
    const deleted = transactionService.deleteById(id);

    if (!deleted) {
      throw Error;
    }
  } catch (error) {
    console.error(error);
  }
}