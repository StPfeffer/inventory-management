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
import { useEffect } from "react";
import { ActionResponse } from "@/types/action";
import { Order } from "shared/types/order";
import { updateOrder } from "@/actions/order/update-order";
import { createOrder } from "@/actions/order/create-order";


const formSchema = z.object({
    date: z
        .date(),
    customerId: z
        .number(),
    status: z
        .string({ required_error: "Please enter the status." })
        .min(3, "The status must be at least 3 characters long.")
        .max(20, { message: "The status must be at most 20 characters long." }),
    total: z
        .number({ required_error: "Please enter the total amount." })
        .min(0, "The total amount must be greater than or equal to 0.")
        .max(1000000, { message: "The total amount must be less than or equal to 1,000,000." })
});


interface NewOrderFormProps {
    _onSubmit: () => void;
    order: Order | null;
}

const NewOrderForm = ({
    _onSubmit,
    order
}: NewOrderFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange'
    });

    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (order) {
            form.reset({
                date: order.date,
                customerId: order.customerId,
                status: order.status,
                total: order.total,
            });
        } else {
            form.reset();
        }
    }, [order]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const orderInfo: Order = {
            date: values.date,
            customerId: values.customerId,
            status: values.status,
            total: values.total,
        }

        let response: ActionResponse;

        if (order) {
            response = await updateOrder(order.id!, orderInfo);
        } else {
            response = await createOrder(orderInfo)
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
                        onClick={() => navigate("/orders/" + response.success?.data?.id)}
                        altText="View order">
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
                    name="date"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Date</FormLabel>

                            <FormControl>
                                <Input type="date" {...field}/>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex w-full justify-between space-x-5">
                    <FormField
                        control={form.control}
                        name="customerId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Customer</FormLabel>

                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Status</FormLabel>

                                <FormControl>
                                    <Input {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="total"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Total</FormLabel>

                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button type="submit">
                        {order ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </Form >
    )
}

export default NewOrderForm;
