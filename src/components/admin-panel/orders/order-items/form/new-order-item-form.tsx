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
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ActionResponse } from "@/types/action";
import { OrderItem } from "shared/types/order";
import { updateOrderItem } from "@/actions/order/order-item/update-order-item";
import { createOrderItem } from "@/actions/order/order-item/create-order-item";
import { Product } from "shared/types/product";
import { fetchProducts } from "@/actions/products/fetch-products";
import MoneyInput from "@/components/geral/money-input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

const formSchema = z.object({
    orderId: z
        .string({ required_error: "Please select a order." })
        .refine((val) => !Number.isNaN(parseInt(val, 10)), {
            message: "Expected number, received a string"
        }),
    product: z.string({ required_error: "Please select a product." }),
    quantity: z
        .string()
        .refine((val) => !Number.isNaN(parseFloat(val)), {
            message: "Expected number, received a string"
        }),
    unitPrice: z
        .number()
        .gt(0, "Price must be greater than 0."),
});

interface NewOrderItemFormProps {
    _onSubmit: () => void;
    orderItem: OrderItem | null;
}

const NewOrderItemForm = ({
    _onSubmit,
    orderItem
}: NewOrderItemFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange'
    });

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedProducts = await fetchProducts();

            if (fetchedProducts.error) {
                toast({
                    title: "Error",
                    description: fetchedProducts.error.message
                })
            } else {
                setProducts(fetchedProducts?.success?.data);
            }
        };

        fetchData();
    }, []);

    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (orderItem) {
            form.reset({
                orderId: orderItem.orderId.toString(),
                product: JSON.stringify(orderItem.product),
                quantity: orderItem.quantity.toString(),
                unitPrice: orderItem.unitPrice,
            });
        } else {
            form.reset();
        }
    }, [orderItem]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const orderItemInfo: OrderItem = {
            orderId: parseInt(values.orderId),
            product: JSON.parse(values.product) as Product,
            quantity: parseInt(values.quantity),
            unitPrice: values.unitPrice,
        }

        let response: ActionResponse;

        if (orderItem) {
            response = await updateOrderItem(orderItem.id!, orderItemInfo);
        } else {
            response = await createOrderItem(orderItemInfo)
        }

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
                        onClick={() => navigate("/:orderId/" + response.success?.data?.id)}
                        altText="View order Item">
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
                    name="product"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Product</FormLabel>

                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value?.toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={products ? "Select a product" : "No products found"}
                                                {...field}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Products</SelectLabel>

                                            {products && products.map((product) =>
                                                <SelectItem
                                                    key={product.id}
                                                    value={JSON.stringify(product)}
                                                >
                                                    {product.name}
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

                <div className="flex w-full justify-between space-x-5">
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

                    <MoneyInput
                        form={form}
                        label="Unit Price"
                        name="unitPrice"
                    />
                </div>

                <div className="flex justify-end">
                    <Button type="submit">
                        {orderItem ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </Form >
    )
}

export default NewOrderItemForm;
