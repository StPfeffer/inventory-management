import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { Product } from "shared/types/product";
import { fetchSupplier } from "@/actions/supplier/fetch-supplier";

export const productsColumns: ColumnDef<Product>[] = [
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
        },
    },
    {
        accessorKey: "image",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Image" sort={false} />
        ),
        meta: {
            label: "Image"
        }
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        meta: {
            label: "Name"
        },
    },
    {
        accessorKey: "description",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Description" sort={false} />
        ),
        meta: {
            label: "Description"
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" />
        ),
        meta: {
            label: "Price"
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price);

            const color = row.getValue("category") === "income" ? "text-green-600" : "text-red-600";

            return <div className={`text-right font-semibold ` + (color)}>{formatted}</div>
        },
    },
    {
        accessorKey: "quantity",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Quantity" />
        ),
        meta: {
            label: "Quantity"
        },
        cell: ({ row }) => {
            let quantity: string = row.getValue("quantity");

            const color: Record<string, string> = {
                income: "bg-blue-400 dark:bg-blue-500",
                debit: "bg-green-400 dark:bg-green-600",
                credit: ""
            }

            return (
                <span className={`hover:` + color[quantity] + " " + color[quantity]}>
                    {quantity}
                </span>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "supplierId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Supplier" sort={false} />
        ),
        meta: {
            label: "Supplier"
        },
        cell: ({ row }) => {
            const supplierId = row.getValue("supplierId");

            const supplier = fetchSupplier(supplierId as number);

            return (
                <span>
                    {supplier ? supplier.name : "N/A"}
                </span>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} acessorKey="id" />
    }
];
