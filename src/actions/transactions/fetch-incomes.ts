import { IncomeService } from "@/services/income-service";
import { Transaction } from "shared/types/transaction";

const incomeService = new IncomeService();

export function fetchRecentIncomes() {
  try {
    const incomes = incomeService.listRecents();

    return (incomes as Transaction[])
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  } catch (error) {
    console.error(error);

    return [];
  }
}

export function fetchIncomes() {
  try {
    const incomes = incomeService.list();

    return incomes as [];
  } catch (error) {
    console.error(error);

    return [];
  }
}
