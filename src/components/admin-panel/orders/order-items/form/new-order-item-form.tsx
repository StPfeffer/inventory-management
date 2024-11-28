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
import { Order, OrderItem } from "shared/types/order";
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
import { updateOrder } from "@/actions/order/update-order";
import { fetchOrder } from "@/actions/order/fetch-orders";

const formSchema = z.object({
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
    orderId: number;
    _onSubmit: () => void;
    orderItem: OrderItem | null;
}

const NewOrderItemForm = ({
    orderId,
    _onSubmit,
    orderItem
}: NewOrderItemFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange'
    });

    const [products, setProducts] = useState<Product[]>([]);
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        console.log(orderId);
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
        fetchOrderr(orderId.toString());
        
        if (orderItem) {
            form.reset({
                product: JSON.stringify(orderItem.product),
                quantity: orderItem.quantity.toString(),
                unitPrice: orderItem.unitPrice,
            });
        } else {
            form.reset();
        }
    }, [orderItem]);

    async function fetchOrderr(orderId: string) {
        const thisOrder = await fetchOrder(orderId);
        setOrder(thisOrder.success?.data);
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(orderId);
        console.log(values);
        const orderItemInfo: OrderItem = {
            orderId: orderId,
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

            const localOrder: Order = {
                id: order!.id,
                date: order!.date,
                customer: order!.customer,
                status: order!.status,
                total: (order!.total + (response.success?.data?.unitPrice * response.success?.data?.quantity))
            };

            await updateOrder(orderId, localOrder);
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
