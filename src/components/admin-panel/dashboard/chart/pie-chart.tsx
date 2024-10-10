

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const transactionData = [
  { method: "creditcard", transactions: 186, fill: "var(--color-creditcard)" },
  { method: "debitcard", transactions: 305, fill: "var(--color-debitcard)" },
  { method: "cash", transactions: 237, fill: "var(--color-cash)" },
  { method: "paypal", transactions: 173, fill: "var(--color-paypal)" },
  { method: "banktransfer", transactions: 209, fill: "var(--color-banktransfer)" },
  { method: "crypto", transactions: 2, fill: "var(--color-crypto)" },
  { method: "check", transactions: 5, fill: "var(--color-check)" },
  { method: "other", transactions: 34, fill: "var(--color-other)" },
];

const chartConfig = {
  creditcard: {
    label: "Credit Card",
  },
  debitcard: {
    label: "Debit Card",
  },
  cash: { 
    label: "Cash",
  },
  paypal: {
    label: "PayPal",
  },
  banktransfer: {
    label: "Bank Transfer",
  },
  crypto: {
    label: "Crypto",
  },
  check: {
    label: "Check",
  },
  other: {
    label: "Other",
  },
} satisfies ChartConfig;

export function DashboardPieChart() {
  const id = "pie-interactive";
  const [activeMethod, setActiveMonth] = React.useState(transactionData[0].method);

  const activeIndex = React.useMemo(
    () => transactionData.findIndex((item) => item.method === activeMethod),
    [activeMethod]
  );
  const months = React.useMemo(() => transactionData.map((item) => item.method), []);

  return (
    <Card data-chart={id} className="flex flex-col w-full">
      <ChartStyle id={id} config={chartConfig} />

      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Methods</CardTitle>
          <CardDescription>July 2024 - Today</CardDescription>
        </div>

        <Select value={activeMethod} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[150px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>

          <SelectContent align="end" className="rounded-xl">
            {months.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={transactionData}
              dataKey="transactions"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />

                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {transactionData[activeIndex].transactions.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Transactions
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
