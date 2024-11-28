import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { OrderItem } from "shared/types/order";

interface OrderItemColumnsProps {
    onEdit: (orderItem: OrderItem) => void,
    onDelete: (orderItem: OrderItem) => void
}

export const orderItemColumns = ({
    onEdit,
    onDelete
}: OrderItemColumnsProps): ColumnDef<OrderItem>[] => [
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
            accessorKey: "orderId",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Order" />
            ),
            meta: {
                label: "Order"
            },
        },
        {
            accessorKey: "productId",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Product" />
            ),
            meta: {
                label: "Product"
            }
        },
        {
            accessorKey: "quantity",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Quantity" />
            ),
            meta: {
                label: "Quantity"
            }
        },
        {
            accessorKey: "unitPrice",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Unit Price" sort={false} />
            ),
            meta: {
                label: "Unit Price"
            },
        },
        {
            id: "actions",
            cell: ({ row }) => <DataTableRowActions row={row} acessorKey="id" onEdit={onEdit} onDelete={onDelete} />
        }
    ];
