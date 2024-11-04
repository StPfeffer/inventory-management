import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import NewCustomerForm from "../form/new-customer-form";
import { Customer } from "shared/types/customer";

interface NewCustomerDialogProps {
    isOpen: boolean,
    onOpenChange: (value: boolean) => void;
    customer: Customer | null;
}

const NewCustomerDialog = ({ isOpen, onOpenChange, customer }: NewCustomerDialogProps) => {
    return (
        <Dialog
            modal
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 sm">
                Add Customer
            </DialogTrigger>

            <DialogContent>
                <DialogDescription>
                    {customer
                        ? "Update the fields below to modify the customer’s information in your account."
                        : "Enter the required details to add a new customer to your account and start managing their profile."}
                </DialogDescription>
                <DialogTitle>
                    {customer ? "Editing the customer info" : "Create a new customer"}
                </DialogTitle>

                <NewCustomerForm
                    customer={customer}
                    _onSubmit={() => { onOpenChange(false) }}
                />
            </DialogContent>
        </Dialog >
    )
}

export default NewCustomerDialog;
