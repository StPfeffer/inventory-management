import { ColumnDef } from "@tanstack/react-table"
import {
  CardBrand,
  Expense,
  PaymentMethod,
  paymentMethodsDetails
} from "@/types/transaction";

import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { Switch } from "@/components/ui/switch";

import { formatDate } from "date-fns";

export const expensesColumns: ColumnDef<Expense>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    )
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return formatDate(row.getValue("date"), "PPP");
    }
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      let type: string = row.getValue("type");

      if (!type) {
        type = "income";
      }

      const color: Record<string, string> = {
        income: "bg-blue-400 dark:bg-blue-500",
        debit: "bg-green-400 dark:bg-green-600",
        credit: ""
      }

      return (
        <Badge className={`hover:` + color[type] + " " + color[type]}>
          {capitalizeFirstLetter(type)}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => {
      const method: PaymentMethod = row.getValue("paymentMethod");
      const formattedMethod = paymentMethodsDetails[method];

      if (!formattedMethod) {
        return <></>
      }

      const colorMethod = method.replace("_", "");

      return (
        <div className="flex items-center gap-2">
          <span
            className="flex h-3 w-3 shrink-0 rounded-sm"
            style={{
              backgroundColor: `var(--color-${colorMethod.toString()})`,
            }}
          />
          {capitalizeFirstLetter(formattedMethod.label)}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "cardBrand",
    header: "Card",
    cell: ({ row }) => {
      const card: CardBrand = row.getValue("cardBrand");

      if (!card) {
        return null;
      }

      return <p>{card}</p>
    }
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-semibold text-red-600">{formatted}</div>
    },
  },
  {
    accessorKey: "transactionId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="External ID" />
    ),
  },
  {
    accessorKey: "recurring",
    header: "Recurring",
    cell: ({ row }) => {
      return <Switch disabled checked={row.getValue("recurring")} />
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} acessorKey="transactionId" />
  }
];
