import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { Order, OrderStatus } from "shared/types/order";
import { formatDate } from "date-fns";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Customer } from "shared/types/customer";

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
            cell: ({ row }) => {
                return formatDate(row.getValue("date"), "PPP");
            },
            meta: {
                label: "Date"
            }
        },
        {
            accessorKey: "customer",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Customer" sort={false} />
            ),
            cell: ({row}) => {
                const customer: Customer = row.getValue("customer");

                return <p>{customer.name}</p>
            },
            meta: {
                label: "Customer"
            },
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }) => {
                const status: OrderStatus = row.getValue("status");
                const colorMethod = status.replace("_", "");

                return (
                    <div className="flex items-center gap-2">
                        <span
                            className="flex h-3 w-3 shrink-0 rounded-sm"
                            style={{
                                backgroundColor: `var(--color-order-${colorMethod.toString()})`,
                            }}
                        />
                        {capitalizeFirstLetter(status)}
                    </div>
                );
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id))
            },
        },
        {
            accessorKey: "total",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Total" />
            ),
            cell: ({ row }) => {
                const total = parseFloat(row.getValue("total"));
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(total);

                return <div className="text-right">{formatted}</div>
            },
            meta: {
                label: "Price"
            }
        },
        {
            id: "actions",
            cell: ({ row }) => <DataTableRowActions row={row} acessorKey="id" onEdit={onEdit} onDelete={onDelete} />
        }
    ];
