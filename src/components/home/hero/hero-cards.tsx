import {
    Button,
    buttonVariants
} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { LightBulbIcon } from "@/components/icon/icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";

export const HeroCards = () => {
    return (
        <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
            <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <Avatar>
                        <AvatarImage
                            alt=""
                            src="https://github.com/shadcn.png"
                        />
                        <AvatarFallback>SH</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <CardTitle className="text-lg">John Doe React</CardTitle>
                        <CardDescription>@john_doe</CardDescription>
                    </div>
                </CardHeader>

                <CardContent>This landing page is awesome!</CardContent>
            </Card>

            <Card
                className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
                <CardHeader className="mt-8 flex justify-center items-center pb-2">
                    <img
                        width={96}
                        height={96}
                        src="assets/kmfacil-logo.png"
                        alt="Km Fácil"
                        className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                    />
                    <CardTitle className="text-center">Km Fácil</CardTitle>
                    <CardDescription className="font-normal text-primary">
                        Fleet Management System
                    </CardDescription>
                </CardHeader>

                <CardContent className="text-center pb-2">
                    <p>
                        Km Fácil offers a comprehensive solution for managing vehicle fleets efficiently, ensuring optimized operations and cost savings.
                    </p>
                </CardContent>

                <CardFooter>
                    <div>
                        <a
                            rel="noreferrer noopener"
                            href="https://github.com/kmfacil"
                            target="_blank"
                            className={buttonVariants({
                                variant: "ghost",
                                size: "sm",
                            })}
                        >
                            <span className="sr-only">Github icon</span>
                            <GitHubLogoIcon className="w-5 h-5" />
                        </a>
                    </div>
                </CardFooter>
            </Card>

            <Card
                className="absolute top-[150px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
                <CardHeader>
                    <CardTitle className="flex item-center justify-between">
                        Free
                        <Badge
                            variant="secondary"
                            className="text-sm text-primary"
                        >
                            Most popular
                        </Badge>
                    </CardTitle>
                    <div>
                        <span className="text-3xl font-bold">$0</span>
                        <span className="text-muted-foreground"> /month</span>
                    </div>

                    <CardDescription>
                        Get started with essential tools to track your finances without any cost.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Button className="w-full">Start Free Trial</Button>
                </CardContent>

                <Separator className="w-4/5 m-auto mb-4" />

                <CardFooter className="flex">
                    <div className="space-y-4">
                        {["First 3 Months Free", "No Credit Card Required", "Unlimited Transactions"].map(
                            (benefit: string) => (
                                <div
                                    key={benefit}
                                    className="flex items-center space-x-2"
                                >
                                    <Check className="text-green-500 w-5 h-5" />
                                    <h3 className="ml-2">{benefit}</h3>
                                </div>
                            )
                        )}
                    </div>
                </CardFooter>
            </Card>

            <Card
                className="absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                    <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                        <LightBulbIcon />
                    </div>
                    <div>
                        <CardTitle>Light & Dark Mode</CardTitle>
                        <CardDescription className="text-md mt-2">
                            Experience a smooth transition between light and dark themes.
                            Your preferences, your way.
                        </CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
}
