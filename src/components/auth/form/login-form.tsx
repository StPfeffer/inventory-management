import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/auth/auth-context-provider";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { User } from "shared/types/user";

const formSchema = z.object({
    email: z
        .string({
            required_error: "Please provide a valid email.",
        })
        .min(5, "Your email must be at least 10 characters long to be valid.")
        .max(25, "Your email cannot exceed 25 characters."),
    password: z
        .string({
            required_error: "Please enter your password to continue.",
        })
});

export function LoginForm() {
    const { login } = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const adminUser: User = {
        id: 1,
        name: "Admin",
        email: "admin@admin.com",
        password: "admin",
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        const existingUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");

        const email = values.email;

        if (email === "admin@admin.com") {
            login({ ...adminUser });
        }

        const user = existingUsers.find(u => u.email === email);

        if (!user) {
            form.setError("email", { type: "manual", message: "Email not found. Please try again." });
            return;
        }

        if (user.password !== values.password) {
            form.setError("password", { type: "manual", message: "Invalid password. Please try again." });
            return;
        }

        login({ ...user });
    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your username below to login to your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Email</FormLabel>

                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>
                                            <div className="flex items-center">
                                                <Label htmlFor="password">Password</Label>
                                                <a href="#" className="ml-auto inline-block text-sm underline"
                                                    tabIndex={-1}>
                                                    Forgot your password?
                                                </a>
                                            </div>
                                        </FormLabel>

                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex flex-col space-y-4 w-full">
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                            <Button variant="outline" className="w-full">
                                Login with Google
                            </Button>
                        </div>

                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a href="/register" className="underline">
                                Sign up
                            </a>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
