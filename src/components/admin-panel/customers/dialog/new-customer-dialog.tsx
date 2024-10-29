import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import NewCustomerForm from "../form/new-customer-form";
import { useState } from "react";

const NewCustomerDialog = () => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog modal open={open} onOpenChange={setOpen}>
            <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 sm">
                Add Customer
            </DialogTrigger>

            <DialogContent>
                <DialogDescription>
                    Fill out the details below to create a new customer in your account.
                </DialogDescription>
                <DialogTitle>
                    Create a new customer
                </DialogTitle>

                <NewCustomerForm _onSubmit={() => { setOpen(false) }} />
            </DialogContent>
        </Dialog >
    )
}

export default NewCustomerDialog;
