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
import { TransactionDetailsDialog } from "../../admin-panel/dialog/transaction-details-dialog";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Transaction } from "@/types/transaction";
import { Customer } from "@/types/customer";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>,
    acessorKey: string;
}

export function DataTableRowActions<TData>({
    row,
    acessorKey
    }: DataTableRowActionsProps<TData>) {
    const transaction = row.original as Customer;

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
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <TransactionDetailsDialog transaction={transaction} /> 
            </DropdownMenuItem>
            <DropdownMenuItem>
                Edit transaction
            </DropdownMenuItem>
            <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(row.getValue(acessorKey))}
            >
                Copy external ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Dialog>
                <DropdownMenuSeparator />
                <DialogTrigger>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        Do you want to delete the entry? Deleting this entry cannot be
                        undone.
                    </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    </DialogFooter>
                </DialogContent>
                </Dialog>
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}