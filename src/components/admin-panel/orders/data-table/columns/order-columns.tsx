import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { Order } from "shared/types/order";

interface OrderColumnsProps {
    onEdit: (order: Order) => void,
    onDelete: (order: Order) => void
}

export const orderColumns = ({
    onEdit,
    onDelete
}: OrderColumnsProps): ColumnDef<Order>[] => [
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
            accessorKey: "date",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Date" />
            ),
            meta: {
                label: "Date"
            },
        },
        {
            accessorKey: "customerId",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Customer" sort={false} />
            ),
            meta: {
                label: "Customer"
            },
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="status" />
            ),
            meta: {
                label: "status"
            }
        },
        {
            accessorKey: "total",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Total" />
            ),
            meta: {
                label: "Total"
            }
        },
        {
            id: "actions",
            cell: ({ row }) => <DataTableRowActions row={row} acessorKey="id" onEdit={onEdit} onDelete={onDelete} />
        }
    ];
