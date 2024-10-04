"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/auth/auth-context-provider";
import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import Link from "next/link";
import { User } from "@/types/user";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { getNextId } from "@/lib/utils";

const formSchema = z.object({
    name: z
        .string({
            required_error: "Please provide a valid name."
        })
        .min(3, "Your name must be at least 3 characters long to be valid.")
        .max(60, "Your name cannot exceed 60 characters."),
    email: z
        .string({
            required_error: "Please provide a valid email."
        })
        .email(),
    username: z
        .string({
            required_error: "Please provide a valid username.",
        })
        .min(5, "Your username must be at least 5 characters long to be valid.")
        .max(25, "Your username cannot exceed 25 characters."),
    password: z
        .string({
            required_error: "Please enter your password to continue.",
        })
        .min(6, "Password must contain at least 6 characters."),
});

export function RegisterForm() {
    const { login } = useAuth();
    const [currentStep, setCurrentStep] = useState<number>(0);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            username: "",
            password: ""
        }
    });

    function advanceStep() {
        setCurrentStep(currentStep + 1);
    }

    function previousStep() {
        setCurrentStep(currentStep - 1);
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        const existingUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");

        const lastId = getNextId(existingUsers);

        const user: User = {
            id: lastId,
            name: values.name,
            username: values.username,
            email: values.email,
            password: values.password
        };

        existingUsers.push(user);
        localStorage.setItem("users", JSON.stringify(existingUsers));

        login({ ...user });
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
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {currentStep === 0 &&
                            <>
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
                                    <Button type="button" className="w-full" onClick={advanceStep}>
                                        Continue
                                    </Button>
                                </div>
                            </>
                        }
                        {currentStep === 1 &&
                            <>
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Username</FormLabel>

                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

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

                                <div className="flex flex-col space-y-4 w-full">
                                    <Button type="button" variant="outline" className="w-full" onClick={previousStep}>
                                        Previous
                                    </Button>
                                    <Button type="submit" className="w-full">
                                        Create account
                                    </Button>
                                </div>
                            </>
                        }

                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="underline">
                                Log In
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
