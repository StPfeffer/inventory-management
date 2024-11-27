import { fetchExpenses } from "@/actions/transactions/fetch-expenses";
import { expensesColumns } from "@/components/admin-panel/transactions/data-table/columns/expenses-columns";
import NewExpenseDialog from "@/components/admin-panel/transactions/dialog/new-expense-dialog";
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
import {
    useEffect,
    useState
} from "react";
import { DataTable } from "@/components/data-table/data-table";
import { useToast } from "@/hooks/use-toast";
import RefreshButton from "@/components/ui/refresh-button";

const ExpensesPage = () => {
    const [expenses, setExpenses] = useState<Transaction[]>([]);

    const { toast } = useToast();

    useEffect(() => {        
        fetchData();
    }, []);

    const fetchData = async () => {
        const fetchedExpenses = await fetchExpenses();

        if (fetchedExpenses.error) {
            toast({
                title: "Error",
                description: fetchedExpenses.error.message
            })
        } else {
            setExpenses(fetchedExpenses?.success?.data);
        }
    };

    return (
        <ContentLayout title="Expenses">
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
                                <a href="/transactions">
                                    Transactions
                                </a>
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
                            <CardTitle>
                                Expenses
                            </CardTitle>
                            <CardDescription>
                                A detailed overview of all expenses activities.
                            </CardDescription>
                        </div>

                        <div className="flex items-center ml-auto gap-2">
                            <RefreshButton onClick={fetchData} />

                            <NewExpenseDialog />
                        </div>
                    </CardHeader>

                    <CardContent>
                        <DataTable
                            columns={expensesColumns}
                            data={expenses}
                            searchPlaceholder="Search expenses..."
                        />
                    </CardContent>
                </Card>
            </main>
        </ContentLayout>
    )
}

export default ExpensesPage;
