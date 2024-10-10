

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Income,
  TransactionCategory
} from "@/types/transaction";
import { Input } from "@/components/ui/input";
import MoneyInput from "@/components/geral/money-input";
import { Switch } from "@/components/ui/switch";
import { DialogClose } from "@/components/ui/dialog";
// import { toast } from "sonner";
import { useAuth } from "@/components/auth/auth-context-provider";
import { getNextId } from "@/lib/utils";

const formSchema = z.object({
  paymentMethod: z
    .string({
      required_error: "Please select a payment method.",
    }),
  description: z
    .string({ required_error: "Please enter a description.", })
    .min(10, "Description must contain at least 10 characters."),
  notes: z
    .string()
    .optional(),
  amount: z
    .number()
    .gt(0, "Amount must be greater than 0."),
  recurring: z
    .boolean()
    .default(false)
    .optional()
});

const NewIncomeForm = ({
  _onSubmit,
  closeDialog = true
}: {
  _onSubmit: (income: Income) => void,
  closeDialog?: boolean
}) => {
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const existingIncomes: Income[] = JSON.parse(localStorage.getItem("incomes") || "[]");

    const lastId = getNextId(existingIncomes);

    const income: Income = {
      id: lastId,
      description: values.description,
      amount: values.amount,
      date: new Date().toLocaleString(),
      category: "income" as TransactionCategory,
      notes: "",
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
      recurring: values.recurring,
      userId: user!.id
    }

    existingIncomes.push(income);
    localStorage.setItem("incomes", JSON.stringify(existingIncomes));

    // toast.success("Income has been created.");

    _onSubmit(income);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            label="Amount"
            name="amount"
          />
        </div>

        <FormField
          control={form.control}
          name="recurring"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Recurring
                </FormLabel>
                <FormDescription>
                  Specify if this income occurs on a regular basis.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

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
