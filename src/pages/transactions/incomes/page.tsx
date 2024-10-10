"use client";

import { fetchIncomes } from "@/actions/fetch-incomes";
import { fetchTransactions } from "@/actions/fetch-transaction";
import { incomesColumns } from "@/components/admin-panel/dashboard/transactions/incomes-columns";
import { IncomesDataTable } from "@/components/admin-panel/data-table/incomes-data-table";
import NewIncomeDialog from "@/components/admin-panel/dialog/new-income-dialog";
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
import { Income, Transaction } from "@/types/transaction";
import Link from "next/link";
import React, { useState } from "react";

const Incomes = () => {
  const { user } = useAuth();

  const [incomes, setIncomes] = useState<Income[]>(() => {
    return fetchIncomes(user!.id);
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    return fetchTransactions(user!.id);
  })

  const addIncome = (newIncomeTransaction: Income) => {
    const updatedIncomes = [...incomes, newIncomeTransaction];
    setIncomes(updatedIncomes);
    localStorage.setItem("incomes", JSON.stringify(updatedIncomes));

    const updatedTransactions = [...transactions, newIncomeTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  return (
    <ContentLayout title="Incomes">
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
              <BreadcrumbPage>Incomes</BreadcrumbPage>
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
              <CardTitle>Incomes</CardTitle>
              <CardDescription>
                A detailed overview of all incomes activities.
              </CardDescription>
            </div>

            <div className="ml-auto gap-1">
              <NewIncomeDialog _onSubmit={addIncome} />
            </div>
          </CardHeader>

          <CardContent>
            <IncomesDataTable columns={incomesColumns} data={incomes} />
          </CardContent>
        </Card>
      </main>
    </ContentLayout>
  )
}

export default Incomes;
