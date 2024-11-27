import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { User } from "shared/types/user";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { createUser } from "@/actions/users/create-user";
import { useNavigate } from "react-router-dom";

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

export function RegisterForm() {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const userInfo: User = {
            name: values.name,
            email: values.email,
            password: values.password
        };

        const createdUser = await createUser(userInfo);

        if (createdUser.error) {
            form.setError("email", { type: "manual", message: createdUser.error.message });

            return;
        }

        navigate("/login");
    }

    return (
        <Card className="sm:w-1/2 xl:w-1/3 2xl:1/4">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                    Enter your email below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Button variant="outline">
                        <GitHubLogoIcon className="mr-2 h-4 w-4" />
                        Github
                    </Button>
                    <Button variant="outline">

                        Google
                    </Button>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

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

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Email</FormLabel>

                                    <FormControl>
                                        <Input type="email" {...field} />
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
                                        <Input type="password" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col space-y-4 w-full">
                            <Button type="submit" className="w-full">
                                Create account
                            </Button>
                        </div>

                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <a href="/login" className="underline">
                                Log In
                            </a>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
