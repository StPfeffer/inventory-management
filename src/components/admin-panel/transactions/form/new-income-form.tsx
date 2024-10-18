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
    Transaction,
    TransactionType
} from "shared/types/transaction";
import MoneyInput from "@/components/geral/money-input";
import { DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import {
    cn,
    getNextId
} from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const formSchema = z.object({
    date: z.date({
        required_error: "A date is required."
    }),
    price: z
        .number()
        .gt(0, "Price must be greater than 0.")
});

const NewIncomeForm = ({
    _onSubmit,
    closeDialog = true
}: {
    _onSubmit: (transaction: Transaction) => void,
    closeDialog?: boolean
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: 0,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const existingIncomes: Transaction[] = JSON.parse(localStorage.getItem("incomes") || "[]");

        const lastId = getNextId(existingIncomes);

        const transaction: Transaction = {
            id: lastId,
            price: values.price,
            date: values.date,
            type: "entry" as TransactionType,
            productId: -1,
            orderId: null
        }

        existingIncomes.push(transaction);
        localStorage.setItem("incomes", JSON.stringify(existingIncomes));

        toast.success("Income has been created.");

        _onSubmit(transaction);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

export default NewIncomeForm;
