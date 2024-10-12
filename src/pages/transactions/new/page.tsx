import { fetchTransactions } from '@/actions/transactions/fetch-transaction';
import NewTransactionForm from '@/components/admin-panel/transactions/form/new-transaction-form';
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
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/components/auth/auth-context-provider';

const NewTransactionPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        return fetchTransactions(user!.id);
    });

    const addTransaction = (newTransaction: Transaction) => {
        const updatedTransactions = [...transactions, newTransaction];
        setTransactions(updatedTransactions);
        localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

        // wtf
        navigate("/transactions/new");
    };

    return (
        <ContentLayout title="Transactions">
            <div className="flex w-full justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <a href="/">
                                    Home
                                </a>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <a href="/dashboard">
                                    Dashboard
                                </a>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <a href="/transactions">
                                    Transactions
                                </a>
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
                </Card>
            </main>
        </ContentLayout>
    )
}

export default NewTransactionPage