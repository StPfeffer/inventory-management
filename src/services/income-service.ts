"use client";

import { transactions } from "@/db/dummy/transactions";
import { isIncome } from "@/lib/utils";
import { Income } from "@/types/transaction";

// should fetch from an external API in the future
export class IncomeService {

  findById(id: number): Income | null {
    const income = this.list().filter(transaction => transaction.id === id).at(0);
    return income === undefined ? null : income;
  }

  list(): Income[] {
    return JSON.parse(localStorage.getItem("incomes") || "[]");
  }

  listByUser(userId: number): Income[] {
    return this.list().filter(t => t.userId === userId);
  }

  initialize(userId: number): void {
    loadDataToLocalStorage("incomes", transactions.filter(t => t.userId === userId).filter(isIncome));
  }

}

export const loadDataToLocalStorage = (key: string, data: Income[]) => {
  const existingData = localStorage.getItem(key);

  if (!existingData) {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  }

  return false;
}
