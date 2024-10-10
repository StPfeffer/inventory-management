"use client";

import { fetchExpenses } from "@/actions/fetch-expenses";
import { fetchTransactions } from "@/actions/fetch-transaction";
import { expensesColumns } from "@/components/admin-panel/dashboard/transactions/expenses-columns";
import { ExpensesDataTable } from "@/components/admin-panel/data-table/expenses-data-table";
import NewExpenseDialog from "@/components/admin-panel/dialog/new-expense-dialog";
import { ContentLayout } from "@/components/admin-panel/layout/content-layout";
import { useAuth } from "@/components/auth/auth-context-provider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Expense, Transaction } from "@/types/transaction";
import Link from "next/link";
import React, { useState } from "react";

const Expenses = () => {
  const { user } = useAuth();

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    return fetchExpenses(user!.id);
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    return fetchTransactions(user!.id);
  })

  const addExpense = (newExpenseTransaction: Expense) => {
    const updatedExpenses = [...expenses, newExpenseTransaction];
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    const updatedTransactions = [...transactions, newExpenseTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  return (
    <ContentLayout title="Expenses">
      <div className="flex w-full justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Expenses</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card
          className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
        >
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Expenses</CardTitle>
              <CardDescription>
                A detailed overview of all expenses activities.
              </CardDescription>
            </div>

            <div className="ml-auto gap-1">
              <NewExpenseDialog _onSubmit={addExpense} />
            </div>
          </CardHeader>

          <CardContent>
            <ExpensesDataTable columns={expensesColumns} data={expenses} />
          </CardContent>
        </Card>
      </main>
    </ContentLayout>
  )
}

export default Expenses;
