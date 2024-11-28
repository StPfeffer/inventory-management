import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { OrderItem } from "shared/types/order";
import NewOrderItemForm from "../form/new-order-item-form";

interface NewOrderItemDialogProps {
    isOpen: boolean,
    onOpenChange: (value: boolean) => void;
    orderItem: OrderItem | null;
}

const NewOrderItemDialog = ({
    isOpen,
    onOpenChange,
    orderItem
}: NewOrderItemDialogProps) => {
    return (
        <Dialog
            modal
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 sm">
                Add Order item
            </DialogTrigger>

            <DialogContent>
                <DialogDescription>
                    {orderItem
                        ? "Update the fields below to modify the order item's information in your account."
                        : "Enter the required details to add a new order item to your account and start managing their profile."}
                </DialogDescription>
                <DialogTitle>
                    {orderItem ? "Editing the order info" : "Create a new order item"}
                </DialogTitle>

                <NewOrderItemForm
                    orderItem={orderItem}
                    _onSubmit={() => { onOpenChange(false) }}
                />
            </DialogContent>
        </Dialog >
    )
}

export default NewOrderItemDialog;
