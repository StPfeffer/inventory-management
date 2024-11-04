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
import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { useToast } from "@/hooks/use-toast";
import { fetchIncomes } from "@/actions/transactions/fetch-incomes";
import { incomesColumns } from "@/components/admin-panel/transactions/data-table/columns/incomes-columns";
import NewIncomeDialog from "@/components/admin-panel/transactions/dialog/new-income-dialog";

const IncomesPage = () => {
    const [incomes, setIncomes] = useState<Transaction[]>([]);

    const { toast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedIncomes = await fetchIncomes();

            if (fetchedIncomes.error) {
                toast({
                    title: "Error",
                    description: fetchedIncomes.error.message
                })
            } else {
                setIncomes(fetchedIncomes?.success?.data);
            }
        };

        fetchData();
    }, []);

    return (
        <ContentLayout title="Incomes">
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
                            <CardTitle>
                                Incomes
                            </CardTitle>
                            <CardDescription>
                                A detailed overview of all incomes activities.
                            </CardDescription>
                        </div>

                        <div className="ml-auto gap-1">
                            <NewIncomeDialog />
                        </div>
                    </CardHeader>

                    <CardContent>
                        <DataTable
                            columns={incomesColumns}
                            data={incomes}
                            searchPlaceholder="Search incomes..."
                        />
                    </CardContent>
                </Card>
            </main>
        </ContentLayout>
    )
}

export default IncomesPage;
