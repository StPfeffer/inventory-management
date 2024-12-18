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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Supplier } from "shared/types/supplier";
import { createSupplier } from "@/actions/supplier/create-supplier";

const formSchema = z.object({
    name: z
        .string({ required_error: "Please enter a name.", })
        .min(5, "Name must contain at least 5 characters."),
    document: z
        .string({ required_error: "Please enter a document.", })
        .min(10, "Description must contain at least 10 characters."),
    contact: z
        .string({ required_error: "Please enter a valid contact info." })
        .min(8, "Contact must be at least 8 characters."),
    address: z
        .string({ required_error: "Please enter a valid address." })
        .min(10, "Adress must be at least 10 characters.")
});

const NewSupplierForm = ({
    _onSubmit
}: {
    _onSubmit: () => void
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

    const { toast } = useToast();
    const navigate = useNavigate();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const supplier: Supplier = {
            name: values.name,
            document: values.document,
            contact: values.contact,
            address: values.address,
        }

        const response = await createSupplier(supplier);

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
                        onClick={() => navigate("/suppliers/" + response.success?.data?.id)}
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
                    <Button type="submit">Create</Button>
                </div>
            </form>
        </Form >
    )
}

export default NewSupplierForm;
