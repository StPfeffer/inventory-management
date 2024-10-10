"use client";

import { fetchExpenses } from "@/actions/fetch-expenses";
import { fetchIncomes } from "@/actions/fetch-incomes";
import { fetchTransactions } from "@/actions/fetch-transaction";
import { transactionColumns } from "@/components/admin-panel/dashboard/transactions/transactions-columns"
import NewTransactionDialog from "@/components/admin-panel/dialog/new-transaction-dialog";
import { ContentLayout } from "@/components/admin-panel/layout/content-layout";
import { useAuth } from "@/components/auth/auth-context-provider";
import { TransactionsDataTable } from "@/components/data-table/data-table"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/types/transaction";
import Link from "next/link";
import React, { useState } from "react";

const Transactions = () => {
  const { user } = useAuth();

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    return fetchTransactions(user!.id);
  });
  const [incomes, setIncomes] = useState<Transaction[]>(() => {
    return fetchIncomes(user!.id);
  });
  const [expenses, setExpenses] = useState<Transaction[]>(() => {
    return fetchExpenses(user!.id);
  });

  const addTransaction = (newTransaction: Transaction) => {
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

    const income = newTransaction.category === "income";

    if (income) {
      const updatedIncomes = [...incomes, newTransaction];
      setIncomes(updatedIncomes);
      localStorage.setItem("incomes", JSON.stringify(updatedIncomes));
    } else {
      const updatedExpenses = [...expenses, newTransaction];
      setExpenses(updatedExpenses);
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    }
  };

  return (
    <ContentLayout title="Transactions">
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
              <BreadcrumbPage>Transactions</BreadcrumbPage>
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
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                A detailed overview of all financial activities.
              </CardDescription>
            </div>

            <div className="ml-auto gap-1">
              <NewTransactionDialog _onSubmit={addTransaction} />
            </div>
          </CardHeader>

          <CardContent>
            <TransactionsDataTable columns={transactionColumns} data={transactions} />
          </CardContent>
        </Card>
      </main>
    </ContentLayout>
  )
}

export default Transactions;
