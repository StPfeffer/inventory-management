

import { ExpenseService } from "@/services/expense-service";
import { Expense } from "@/types/transaction";

const expenseService = new ExpenseService();

export function fetchRecentExpenses(userId: number): Expense[] {
  try {
    const expenses = expenseService.listByUser(userId);

    return (expenses as Expense[])
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  } catch (error) {
    console.error(error);

    return [];
  }
}

export function fetchExpenses(userId: number) {
  try {
    const expenses = expenseService.listByUser(userId);
    return expenses as [];
  } catch (error) {
    console.error(error);

    return [];
  }
}

export function initializeExpenses(userId: number) {
  return expenseService.initialize(userId);
}

export function fetchExpense(id: string): Expense | null {
  try {
    const expense = expenseService.findById(Number.parseInt(id));

    return expense;
  } catch (error) {
    console.error(error);

    return null;
  }
};
