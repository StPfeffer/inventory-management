import { fetchTransactions } from "@/actions/transactions/fetch-transaction";
import CardTotal from "@/components/admin-panel/transactions/dashboard/card/card-total";
import { calculateCardInfo } from "@/components/admin-panel/transactions/dashboard/card/helper";
import { CardInfo } from "@/components/admin-panel/transactions/dashboard/card/types";
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
import { useCallback, useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { useToast } from "@/hooks/use-toast";
import {
    batchDeleteTransaction,
    deleteTransaction
} from "@/actions/transactions/delete-transaction";
import { transactionColumns } from "@/components/admin-panel/transactions/data-table/columns/transactions-columns";
import RefreshButton from "@/components/ui/refresh-button";

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

    const { toast } = useToast();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const fetchedTransactions = await fetchTransactions();

        if (fetchedTransactions.error) {
            toast({
                title: "Error",
                description: fetchedTransactions.error.message
            })
        } else {
            setTransactions(fetchedTransactions?.success?.data);
        }
    };

    const onDelete = useCallback(async (transaction: Transaction) => {
        const response = await deleteTransaction(transaction.id!);

        if (response.error) {
            toast({
                title: "Error",
                description: response.error.message
            });
        } else {
            toast({
                title: "Success",
                description: response?.success?.message
            });
        }
    }, []);

    const onBatchDelete = useCallback(async (transactions: Transaction[]) => {
        const response = await batchDeleteTransaction(transactions.map(c => c.id!));

        if (response.error) {
            toast({
                title: "Error",
                description: response.error.message
            });
        } else {
            toast({
                title: "Success",
                description: response?.success?.message
            });
        }
    }, []);

    const onEdit = useCallback((transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setIsDialogOpen(true);
    }, []);

    const cardInfo: CardInfo[] = calculateCardInfo(transactions);

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

                        <div className="flex items-center ml-auto gap-2">
                            <RefreshButton onClick={fetchData} />

                            <NewTransactionDialog
                                isOpen={isDialogOpen}
                                onOpenChange={(value: boolean) => {
                                    setIsDialogOpen(value);
                                    if (!value) {
                                        setSelectedTransaction(null);
                                    }
                                }}
                                transaction={selectedTransaction}
                            />
                        </div>
                    </CardHeader>

                    <CardContent>
                        <DataTable
                            columns={transactionColumns({ onEdit, onDelete })}
                            data={transactions}
                            searchPlaceholder="Search transactions..."
                            onDelete={onBatchDelete}
                        />
                    </CardContent>
                </Card>
            </main>
        </ContentLayout>
    )
}

export default TransactionsPage;
