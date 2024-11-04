import { TrendingUp } from "lucide-react";
import {
    PolarAngleAxis,
    PolarGrid,
    Radar,
    RadarChart
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    { month: "January", incomes: 186, expenses: 80 },
    { month: "February", incomes: 305, expenses: 200 },
    { month: "March", incomes: 237, expenses: 120 },
    { month: "April", incomes: 73, expenses: 190 },
    { month: "May", incomes: 209, expenses: 130 },
    { month: "June", incomes: 214, expenses: 140 },
];

const chartConfig = {
    incomes: {
        label: "Incomes",
        color: "hsl(var(--chart-1))",
    },
    expenses: {
        label: "Expenses",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function DashboardRadarChart() {
    return (
        <Card className="w-full">
            <CardHeader className="items-center pb-4">
                <CardTitle>Categories</CardTitle>

                <CardDescription>
                    Showing total transactions by type for the last 6 months
                </CardDescription>
            </CardHeader>

            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadarChart data={chartData}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />

                        <PolarAngleAxis dataKey="month" />
                        <PolarGrid />

                        <Radar
                            dataKey="incomes"
                            fill="var(--color-incomes)"
                            fillOpacity={0.6}
                        />
                        <Radar dataKey="expenses" fill="var(--color-expenses)" />
                    </RadarChart>
                </ChartContainer>
            </CardContent>

            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>

                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    January - June 2024
                </div>
            </CardFooter>
        </Card>
    );
}
