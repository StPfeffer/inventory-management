"use client";

import { transactions } from "@/db/dummy/transactions";
import { isExpense } from "@/lib/utils";
import { Expense } from "@/types/transaction";

// should fetch from an external API in the future
export class ExpenseService {

  findById(id: number): Expense | null {
    const expense = this.list().filter(e => e.id === id).at(0);
    return expense === undefined ? null : expense;
  }

  list(): Expense[] {
    return JSON.parse(localStorage.getItem("expenses") || "[]");
  }

  listByUser(userId: number): Expense[] {
    return this.list().filter(t => t.userId === userId);
  }

  initialize(userId: number): void {
    loadDataToLocalStorage("expenses", transactions.filter(t => t.userId === userId).filter(isExpense));
  }

}

export const loadDataToLocalStorage = (key: string, data: Expense[]) => {
  const existingData = localStorage.getItem(key);

  if (!existingData) {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  }

  return false;
}
