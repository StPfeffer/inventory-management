import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import NewTransactionForm from "../form/new-transaction-form";
import { useState } from "react";
import { Transaction } from "shared/types/transaction";

interface NewTransactionDialogProps {
    isOpen: boolean,
    onOpenChange: (value: boolean) => void;
    transaction: Transaction | null;
}

const NewTransactionDialog = ({
    isOpen,
    onOpenChange,
    transaction
}: NewTransactionDialogProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog
            modal
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 sm">
                Add Transaction
            </DialogTrigger>

            <DialogContent>
                <DialogDescription>
                    {transaction
                        ? "Update the fields below to modify the transaction's information in your account."
                        : "Enter the required details to add a new transaction to your account."}
                </DialogDescription>
                <DialogTitle>
                    {transaction ? "Editing the transaction info" : "Create a new transaction"}
                </DialogTitle>

                <NewTransactionForm
                    transaction={transaction}
                    _onSubmit={() => { setOpen(false) }}
                />
            </DialogContent>
        </Dialog >
    )
}

export default NewTransactionDialog;
