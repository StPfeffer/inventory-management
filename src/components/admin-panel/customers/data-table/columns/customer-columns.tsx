import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { Customer } from "shared/types/customer";

interface CustomerColumnsProps {
    onEdit: (customer: Customer) => void,
    onDelete: (customer: Customer) => void
}

export const customerColumns = ({ onEdit, onDelete }: CustomerColumnsProps): ColumnDef<Customer>[] => [
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
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        meta: {
            label: "Name"
        },
    },
    {
        accessorKey: "document",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Document" sort={false} />
        ),
        meta: {
            label: "Document"
        },
    },
    {
        accessorKey: "contact",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Contact" />
        ),
        meta: {
            label: "Contact"
        }
    },
    {
        accessorKey: "address",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Address" />
        ),
        meta: {
            label: "Address"
        }
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} acessorKey="id" onEdit={onEdit} onDelete={onDelete} />
    }
];
