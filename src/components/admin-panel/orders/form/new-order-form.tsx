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
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ActionResponse } from "@/types/action";
import { Order, orderStatusDetails } from "shared/types/order";
import { updateOrder } from "@/actions/order/update-order";
import { createOrder } from "@/actions/order/create-order";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Customer } from "@/types/customer";
import { fetchCustomers } from "@/actions/customer/fetch-customers";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";


const formSchema = z.object({
    date: z.date({
        required_error: "A date is required."
    }),
    customerId: z
        .number({ required_error: "Please enter the customer ID." })
        .min(1, "The customer ID must be a positive number."),
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

    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedOrders= await fetchCustomers();

            if (fetchedOrders.error) {
                toast({
                    title: "Error",
                    description: fetchedOrders.error.message
                })
            } else {
                setCustomers(fetchedOrders?.success?.data);
            }
        };

        fetchData();
    }, []);

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
                            <FormItem className="flex flex-col w-full">
                                <FormLabel className="pb-1">
                                    Date
                                </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

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
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value?.toString()}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder={customers ? "Select a customer" : "No Customers found"}
                                                    {...field}
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Customer</SelectLabel>

                                                {customers && customers.map((customer) =>
                                                    <SelectItem
                                                        key={customer.id}
                                                        value={customer.id ? customer.id.toString() : "-1"}
                                                    >
                                                        {customer.name}
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

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Status</FormLabel>

                                <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a type" {...field} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Status</SelectLabel>
                                                {orderStatusDetails.map((c) => (
                                                    <SelectItem key={c.type} value={c.type}>
                                                        <div className="flex items-center">
                                                            {c.description}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

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
