"use client";

import { ColumnDef } from "@tanstack/react-table"
import { Customer } from "@/types/customer";

import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import CustomerDataTableRowActions from "./cutomer-data-table-row-actions";

interface CustomerColumnsProps {
  onEdit: (customer : Customer) => void,
  onDelete: (customer : Customer) => void
}

export const CustomerColumns = ({onEdit, onDelete} : CustomerColumnsProps): ColumnDef<Customer>[] => [
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
    )
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "document",
    header: "Document number",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    id: "actions",
    cell: ({ row }) => <CustomerDataTableRowActions row={row} acessorKey="customerId" onEdit={onEdit} onDelete={onDelete} />,
    size: 50,
  }
];