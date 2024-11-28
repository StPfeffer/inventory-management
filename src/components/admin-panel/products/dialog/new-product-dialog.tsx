import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import NewProductForm from "../form/new-product-form";
import { Product } from "shared/types/product";

interface NewProductDialogProps {
    isOpen: boolean,
    onOpenChange: (value: boolean) => void;
    product: Product | null;
}

const NewProductDialog = ({
    isOpen,
    onOpenChange,
    product
}: NewProductDialogProps) => {
    return (
        <Dialog
            modal
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 sm">
                Add Product
            </DialogTrigger>

            <DialogContent>
                <DialogDescription>
                    Fill out the details below to create a new product in your account.
                </DialogDescription>
                <DialogTitle>
                    Create a new product
                </DialogTitle>

                <NewProductForm
                    product={product}
                    _onSubmit={() => { onOpenChange(false) }}
                />
            </DialogContent>
        </Dialog >
    )
}

export default NewProductDialog;
