"use client";

import { fetchTransactions } from '@/actions/fetch-transaction';
import NewTransactionForm from '@/components/admin-panel/form/new-transaction-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Transaction } from '@/types/transaction';
import { ContentLayout } from '@/components/admin-panel/layout/content-layout';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchIncomes } from '@/actions/fetch-incomes';
import { fetchExpenses } from '@/actions/fetch-expenses';
import { useAuth } from '@/components/auth/auth-context-provider';

const NewTransactionPage = () => {
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

  const router = useRouter();

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

    // wtf
    router.refresh();
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
              <BreadcrumbLink asChild>
                <Link href="/transactions">Transactions</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>New</BreadcrumbPage>
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
              <CardTitle>Add Transaction</CardTitle>
              <CardDescription>
                Fill out the details below to create a new transaction in your account.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <NewTransactionForm closeDialog={false} _onSubmit={addTransaction} />
          </CardContent>
        </Card >
      </main>
    </ContentLayout>
  )
}

export default NewTransactionPage