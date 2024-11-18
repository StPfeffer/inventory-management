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
import { Customer } from "shared/types/customer";
import { createCustomer } from "@/actions/customer/create-customer";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { updateCustomer } from "@/actions/customer/update-customer";
import { ActionResponse } from "@/types/action";

const formSchema = z.object({
    name: z
        .string({ required_error: "Please enter a name.", })
        .min(5, "Name must contain at least 5 characters.")
        .max(50, { message: 'Name should be shorter than 50 characteres.' }),
    document: z
        .string({ required_error: "Please enter a document.", })
        .min(10, "Description must contain at least 10 characters.")
        .max(25, { message: 'Document should be shorter than 25 characteres.' }),
    contact: z
        .string({ required_error: "Please enter a valid contact info." })
        .min(8, "Contact must be at least 8 characters.")
        .max(20, { message: 'Contact should be shorter than 20 characteres.' }),
    address: z
        .string({ required_error: "Please enter a valid address." })
        .min(10, "Adress must be at least 10 characters.")
        .max(100, { message: 'Address should be shorter than 100 characteres.' })
});

interface NewCustomerFormProps {
    _onSubmit: () => void;
    customer: Customer | null;
}

const NewCustomerForm = ({
    _onSubmit,
    customer
}: NewCustomerFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange'
    });

    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (customer) {
            form.reset({
                name: customer.name,
                address: customer.address,
                contact: customer.contact,
                document: customer.document,
            });
        } else {
            form.reset();
        }
    }, [customer]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const customerInfo: Customer = {
            name: values.name,
            document: values.document,
            contact: values.contact,
            address: values.address,
        }

        let response: ActionResponse;

        if (customer) {
            response = await updateCustomer(customer.id!, customerInfo);
        } else {
            response = await createCustomer(customerInfo);
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
                        onClick={() => navigate("/customers/" + response.success?.data?.id)}
                        altText="View customer">
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

                <div className="flex w-full justify-between space-x-5">
                    <FormField
                        control={form.control}
                        name="document"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Document</FormLabel>

                                <FormControl>
                                    <Input {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="contact"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Contact</FormLabel>

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
                    name="address"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Address</FormLabel>

                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button type="submit">
                        {customer ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </Form >
    )
}

export default NewCustomerForm;
