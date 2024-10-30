import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Customer } from "@/types/customer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from 'zod';

const formSchema = z.object({
    name: z.string()
        .min(1, { message: 'Name is empty.' })
        .max(50, { message: 'Name should be shorter than 50 characteres.' }),
    address: z.string()
        .min(1, { message: 'Address is empty.' })
        .max(100, { message: 'Address should be shorter than 100 characteres.' }),
    contact: z.string()
        .min(1, { message: 'Contact is empty.' })
        .max(20, { message: 'Contact should be shorter than 20 characteres.' }),
    document: z.string()
        .min(1, { message: 'Document is empty.' })
        .max(25, { message: 'Document should be shorter than 25 characteres.' }),
});

interface NewCustomerFormProps {
    isOpen: boolean,
    onOpenChange: (value: boolean) => void;
    customer: Customer | null;
}

export const NewCustomerForm = ({ isOpen, onOpenChange, customer }: NewCustomerFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        },
        mode: 'onChange'
    })

    useEffect(() => {
        if (customer) {
            form.reset({
                name: customer.name,
                address: customer.address,
                contact: customer.contact,
                document: customer.document
            });
        } else {
            form.reset()
        }
    }, [isOpen, customer])

    // const onUpdatedSuccess = (updateCustomer: Customer) => {
    //     alert("Customer updated");
    //     onOpenChange(false);
    // }

    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        onOpenChange(false);
    }


    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button size="lg">Add Customer</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {customer ? 'Updade the customer' : 'Create new customer'}
                    </DialogTitle>
                </DialogHeader>
                <Form{...form}>
                    <form className="">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Silva" {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                        <FormField
                            name="document"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Document Number</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="001.002.003-04" {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                        <FormField
                            name="address"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="St. Blabla" {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                        <FormField
                            name="contact"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="+55999999999" {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                    </form>
                </Form>
                <DialogFooter>
                    <Button type="button" disabled={!form.formState.isValid} onClick={form.handleSubmit(onSubmit)}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}