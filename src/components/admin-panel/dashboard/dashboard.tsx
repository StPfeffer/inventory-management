import CardTotal from "../transactions/dashboard/card/card-total";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import { transactionColumns } from "../transactions/data-table/columns/transactions-columns";
import { Transaction } from "@/types/transaction";
import { CardInfo } from "../transactions/dashboard/card/types";
import { DashboardPieChart } from "./chart/pie-chart";
import { DashboardRadarChart } from "./chart/radar-chart";

interface DashboardProps {
    transactions: Transaction[];
    cardInfo: CardInfo[];
}

const Dashboard = ({
    transactions,
    cardInfo
}: DashboardProps) => {

    return (
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
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>
                            A detailed overview of your most recent financial activities.
                        </CardDescription>
                    </div>

                    <Button asChild size="sm" className="ml-auto gap-1">
                        <a href="/transactions">
                            <span className="hidden md:block">
                                View All
                            </span>
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </Button>
                </CardHeader>

                <CardContent>
                    <DataTable columns={transactionColumns} data={transactions} />
                </CardContent>
            </Card>

            <Card
                className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
            >
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>Overview</CardTitle>
                    </div>

                </CardHeader>
                <CardContent>
                    <div className="grid lg:flex md:grid-cols-2 w-full lg:justify-between gap-8">
                        <DashboardPieChart />
                        <DashboardRadarChart />
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}

export default Dashboard;
