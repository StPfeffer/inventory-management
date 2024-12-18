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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import MoneyInput from "@/components/geral/money-input";
import {
    Transaction,
    TransactionType,
    transactionTypeDetails
} from "shared/types/transaction";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import { createTransaction } from "@/actions/transactions/create-transaction";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ActionResponse } from "@/types/action";
import { updateTransaction } from "@/actions/transactions/update-transaction";

const formSchema = z.object({
    type: z
        .string({
            required_error: "Please select a type.",
        }),
    date: z
        .date({
            required_error: "Please select a date.",
        }),
    price: z
        .number()
        .gt(0, "Price must be greater than 0."),
});

interface NewTransactionFormProps {
    _onSubmit: () => void;
    transaction: Transaction | null;
}

const NewTransactionForm = ({
    _onSubmit,
    transaction
}: NewTransactionFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: 0,
        },
        mode: 'onChange'
    });

    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (transaction) {
            form.reset({
                type: transaction.type,
                date: transaction.date,
                price: transaction.price,
            });
        } else {
            form.reset();
        }
    }, [transaction]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const transactionInfo: Transaction = {
            price: values.price,
            date: values.date,
            type: values.type as TransactionType,
            productId: null,
            orderId: null
        }

        let response: ActionResponse;

        if (transaction) {
            response = await updateTransaction(transaction.id!, transactionInfo);
        } else {
            response = await createTransaction(transactionInfo);
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
                        onClick={() => navigate("/transactions/" + response.success?.data?.id)}
                        altText="View transaction">
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
                <div className="flex w-full justify-between space-x-5">
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Type</FormLabel>

                                <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a type" {...field} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Types</SelectLabel>
                                                {transactionTypeDetails.map((c) => (
                                                    <SelectItem key={c.type} value={c.type}>
                                                        <div className="flex items-center">
                                                            <c.icon className="w-4 h-4 mr-2" />
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

                <div className="flex w-full justify-between items-center space-x-5">
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

                    <div className="w-full mb-1.5">
                        <MoneyInput
                            form={form}
                            label="Price"
                            name="price"
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button type="submit">
                        {transaction ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </Form >
    )
}

export default NewTransactionForm;
