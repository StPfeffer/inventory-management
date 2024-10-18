import { fetchTransactions } from "@/actions/transactions/fetch-transaction";
import CardTotal from "@/components/admin-panel/transactions/dashboard/card/card-total";
import { calculateCardInfo } from "@/components/admin-panel/transactions/dashboard/card/helper";
import { CardInfo } from "@/components/admin-panel/transactions/dashboard/card/types";
import { transactionColumns } from "@/components/admin-panel/transactions/data-table/columns/transactions-columns"
import NewTransactionDialog from "@/components/admin-panel/transactions/dialog/new-transaction-dialog";
import { ContentLayout } from "@/components/admin-panel/layout/content-layout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Transaction } from "shared/types/transaction";
import { useState } from "react";
import { DataTable } from "@/components/data-table/data-table";

const TransactionsPage = () => {
    const cardInfo: CardInfo[] = calculateCardInfo(fetchTransactions());

    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        return fetchTransactions();
    });

    const addTransaction = (newTransaction: Transaction) => {
        const updatedTransactions = [...transactions, newTransaction];
        setTransactions(updatedTransactions);
        localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
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
                            <BreadcrumbPage>
                                Transactions
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    {cardInfo.map((info, index) => (
                        <CardTotal
                            key={index}
                            label={info.label}
                            value={info.value}
                            textColor={info.textColor}
                            description={info.description}
                        />
                    ))}
                </div>

                <Card
                    className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                >
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>
                                Transactions
                            </CardTitle>
                            <CardDescription>
                                A detailed overview of all financial activities.
                            </CardDescription>
                        </div>

                        <div className="ml-auto gap-1">
                            <NewTransactionDialog _onSubmit={addTransaction} />
                        </div>
                    </CardHeader>

                    <CardContent>
                        <DataTable columns={transactionColumns} data={transactions} searchPlaceholder="Search transactions..." />
                    </CardContent>
                </Card>
            </main>
        </ContentLayout>
    )
}

export default TransactionsPage;
