import { ColumnDef } from "@tanstack/react-table"
import { Transaction } from "@/types/transaction";

import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { formatDate } from "date-fns";

export const transactionColumns: ColumnDef<Transaction>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
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
        ),
        meta: {
            label: "ID"
        }
    },
    {
        accessorKey: "date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date" />
        ),
        cell: ({ row }) => {
            return formatDate(row.getValue("date"), "PPP");
        },
        meta: {
            label: "Date"
        }
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
            let type: string = row.getValue("type");

            const color: Record<string, string> = {
                entry: "bg-green-400 dark:bg-green-500",
                exit: "bg-red-400 dark:bg-red-600",
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
        meta: {
            label: "Type"
        }
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price);

            const color = row.getValue("category") === "income" ? "text-green-600" : "text-red-600";

            return <div className={`text-right font-semibold ` + (color)}>{formatted}</div>
        },
        meta: {
            label: "Price"
        }
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} acessorKey="id" />
    }
];
