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
import { User } from "shared/types/user";
import { createUser } from "@/actions/users/create-user";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { updateUser } from "@/actions/users/update-user";
import { ActionResponse } from "@/types/action";

const formSchema = z.object({
    name: z
        .string({ required_error: "Please enter a name.", })
        .min(5, "Name must contain at least 5 characters.")
        .max(50, { message: 'Name should be shorter than 50 characteres.' }),
    email: z
        .string({ required_error: "Please enter a email.", })
        .min(5, "email must contain at least 5 characters.")
        .email("This is not a valid email."),
    password: z
        .string({ required_error: "Please enter a valid password." })
        .min(8, "Password must be at least 8 characters.")
        .max(100, { message: 'Password should be shorter than 100 characteres.' })
});

interface NewUserFormProps {
    _onSubmit: () => void;
    user: User | null;
}

const NewUserForm = ({
    _onSubmit,
    user
}: NewUserFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange'
    });

    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            form.reset({
                name: user.name,
                email: user.email,
                password: user.password
            });
        } else {
            form.reset();
        }
    }, [user]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const userInfo: User = {
            name: values.name,
            email: values.email,
            password: values.password
        }

        let response: ActionResponse;

        if (user) {
            response = await updateUser(user.id!, userInfo);
        } else {
            response = await createUser(userInfo);
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
                        onClick={() => navigate("/users/" + response.success?.data?.id)}
                        altText="View user">
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
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Email</FormLabel>

                                <FormControl>
                                    <Input type="email" required {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Password</FormLabel>

                                <FormControl>
                                    <Input type="password" required {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-end">
                    <Button type="submit">
                        {user ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </Form >
    )
}

export default NewUserForm;
