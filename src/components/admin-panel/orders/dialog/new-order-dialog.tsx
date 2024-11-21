import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import NewOrderForm from "../form/new-order-form";
import { Order } from "shared/types/order";

interface NewOrderDialogProps {
    isOpen: boolean,
    onOpenChange: (value: boolean) => void;
    order: Order | null;
}

const NewOrderDialog = ({
    isOpen,
    onOpenChange,
    order
}: NewOrderDialogProps) => {
    return (
        <Dialog
            modal
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 sm">
                Add Order
            </DialogTrigger>

            <DialogContent>
                <DialogDescription>
                    {order
                        ? "Update the fields below to modify the order's information in your account."
                        : "Enter the required details to add a new order to your account and start managing their profile."}
                </DialogDescription>
                <DialogTitle>
                    {order ? "Editing the order info" : "Create a new order"}
                </DialogTitle>

                <NewOrderForm
                    order={order}
                    _onSubmit={() => { onOpenChange(false) }}
                />
            </DialogContent>
        </Dialog >
    )
}

export default NewOrderDialog;
