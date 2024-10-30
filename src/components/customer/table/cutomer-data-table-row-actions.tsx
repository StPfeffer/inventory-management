import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
  } from "../../ui/dropdown-menu"
import { Button } from "../../ui/button";
import { Ellipsis } from "lucide-react";
import { Row } from "@tanstack/react-table";

interface CustomerDataTableRowActionsProps<TData> {
    row: Row<TData>,
    acessorKey: string ,
    onEdit: (value: TData) => void,
    onDelete: (value: TData) => void;
}

export default function CustomerDataTableRowActions<TData>({
    row,
    acessorKey,
    onEdit,
    onDelete
    }: CustomerDataTableRowActionsProps<TData>) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <Ellipsis className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(row.getValue(acessorKey))}
                >
                    Copy external ID
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onEdit(row.original)}>Edit</DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={() => onDelete(row.original)}>Delete</DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}