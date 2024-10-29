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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Product } from "shared/types/product";
import ImageUpload from "@/components/image-upload/image-upload";
import { createProduct } from "@/actions/products/create-product";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Supplier } from "shared/types/supplier";
import { fetchSuppliers } from "@/actions/supplier/fetch-supplier";

const formSchema = z.object({
    name: z
        .string({ required_error: "Please enter a name.", })
        .min(10, "Name must contain at least 10 characters."),
    description: z
        .string({ required_error: "Please enter a description.", })
        .min(20, "Description must contain at least 20 characters."),
    price: z
        .number()
        .gt(0, "Price must be greater than 0."),
    quantity: z
        .string().refine((val) => !Number.isNaN(parseFloat(val)), {
            message: "Expected number, received a string"
        }),
    image: z
        .instanceof(File)
        .refine((file) => file.size !== 0, "Please upload an image"),
    supplierId: z
        .number({ required_error: "Please select a supplier." })
});

const NewProductForm = ({
    _onSubmit
}: {
    _onSubmit: () => void
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quantity: "0",
        },
    });

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedProducts = await fetchSuppliers();

            if (fetchedProducts.error) {
                toast({
                    title: "Error",
                    description: fetchedProducts.error.message
                })
            } else {
                setSuppliers(fetchedProducts?.success?.data);
            }
        };

        fetchData();
    }, []);

    const { toast } = useToast();
    const navigate = useNavigate();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const product: Product = {
            name: values.name,
            description: values.description,
            price: values.price,
            quantity: parseFloat(values.quantity),
            image: "",
            supplierId: values.supplierId
        }

        const response = await createProduct(product);

        if (response.error) {
            toast({
                title: "Error",
                description: response.error.message
            })
        } else {
            toast({
                title: "Success",
                description: response.success?.message,
                action: (
                    <ToastAction
                        onClick={() => navigate("/products/" + response.success?.data?.id)}
                        altText="View product">
                        View
                    </ToastAction>
                ),
            });
        }

        _onSubmit();
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

                <FormField
                    control={form.control}
                    name="supplierId"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Supplier</FormLabel>

                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value?.toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={suppliers ? "Select a supplier" : "No suppliers found"}
                                                {...field}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Suppliers</SelectLabel>

                                            {suppliers && suppliers.map((supplier) =>
                                                <SelectItem
                                                    key={supplier.id}
                                                    value={supplier.id ? supplier.id.toString() : ""}
                                                >
                                                    {supplier.name}
                                                </SelectItem>
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

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
                    <Button type="submit">Create</Button>
                </div>
            </form>
        </Form >
    )
}

export default NewProductForm;
