import { Transaction } from "@/types/transaction";
import { CardInfo } from "./types";

export function calculateCardInfo(transactions: Transaction[]): CardInfo[] {
  const currentDate = new Date();
  const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);

  const filterTransactions = (date: Date, category: string) =>
    transactions
      .filter(transaction => {
        const transactionDate = new Date(transaction.date);

        return (
          transactionDate.getFullYear() === date.getFullYear() &&
          transactionDate.getMonth() === date.getMonth() &&
          transaction.category === category
        );
      })
      .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomes = filterTransactions(currentDate, "income");
  const totalExpenses = filterTransactions(currentDate, "expense");
  const previousTotalIncomes = filterTransactions(lastMonth, "income");
  const previousTotalExpenses = filterTransactions(lastMonth, "expense");

  const netBalance = totalIncomes - totalExpenses;
  const totalTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate.getFullYear() === currentDate.getFullYear() &&
      transactionDate.getMonth() === currentDate.getMonth()
    );
  }).length;

  const incomeChange = calculateChange(totalIncomes, previousTotalIncomes);
  const expenseChange = calculateChange(totalExpenses, previousTotalExpenses);
  const netBalanceChange = calculateChange(netBalance, previousTotalIncomes - previousTotalExpenses);

  return [
    {
      label: "Total Incomes",
      value: `$${totalIncomes.toFixed(2)}`,
      textColor: incomeChange >= 0 ? "text-green-600" : "text-red-500",
      description: `${incomeChange >= 0 ? "+" : ""}${incomeChange}% from last month`
    },
    {
      label: "Total Expenses",
      value: `$${totalExpenses.toFixed(2)}`,
      textColor: expenseChange >= 0 ? "text-green-600" : "text-red-500",
      description: `${expenseChange >= 0 ? "+" : ""}${expenseChange}% from last month`
    },
    {
      label: "Net Balance",
      value: `$${netBalance.toFixed(2)}`,
      textColor: netBalanceChange >= 0 ? "text-green-600" : "text-red-500",
      description: `${netBalanceChange >= 0 ? "+" : ""}${netBalanceChange}% from last month`
    },
    {
      label: "Transactions",
      value: `${totalTransactions}`,
      textColor: "",
      description: "in this month"
    },
  ];
}

const calculateChange = (current: number, previous: number) =>
  previous
    ? Number.parseFloat(((current - previous) / previous * 100).toFixed(2))
    : 0;