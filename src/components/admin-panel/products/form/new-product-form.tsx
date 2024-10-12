import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MoneyInput from "@/components/geral/money-input";
import { getNextId } from "@/lib/utils";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Product } from "@/types/product";
import ImageUpload from "@/components/image-upload/image-upload";

const formSchema = z.object({
    name: z
        .string({ required_error: "Please enter a name.", })
        .min(10, "Name must contain at least 5 characters."),
    description: z
        .string({ required_error: "Please enter a description.", })
        .min(10, "Description must contain at least 10 characters."),
    price: z
        .number()
        .gt(0, "Price must be greater than 0."),
    quantity: z
        .number()
        .gt(-1, "Quantity must be at least 0."),
    image: z
        .instanceof(File)
        .refine((file) => file.size !== 0, "Please upload an image")
});

const NewProductForm = ({
    _onSubmit,
    closeDialog = true
}: {
    _onSubmit: (transaction: Product) => void,
    closeDialog?: boolean
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            quantity: 0,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const existingTransactions: Product[] = JSON.parse(localStorage.getItem("transactions") || "[]");

        const lastId = getNextId(existingTransactions);

        const transaction: Product = {
            id: lastId,
            name: values.name,
            description: values.description,
            price: values.price,
            quantity: values.quantity,
            image: "", // values.image,
            supplierId: 1 // values.supplier.id,
        }

        existingTransactions.push(transaction);
        localStorage.setItem("transactions", JSON.stringify(existingTransactions));

        toast.success("Product has been created.");

        _onSubmit(transaction);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Name</FormLabel>

                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Description</FormLabel>

                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex w-full justify-between space-x-5">
                    <MoneyInput
                        form={form}
                        label="Price"
                        name="price"
                    />

                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Quantity</FormLabel>

                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            Upload Image
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-center">
                                Upload your product images
                            </DialogTitle>

                            <DialogDescription className="text-center">
                                The only file upload you will ever need
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <ImageUpload />
                        </div>
                    </DialogContent>
                </Dialog>

                <div className="flex justify-end">
                    {closeDialog &&
                        <DialogClose asChild>
                            <Button type="submit">Create</Button>
                        </DialogClose>
                    }
                    {!closeDialog &&
                        <Button type="submit">Create</Button>
                    }
                </div>
            </form>
        </Form >
    )
}

export default NewProductForm;
