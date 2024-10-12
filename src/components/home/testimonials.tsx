import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "../ui/avatar";
import { getUserInitials } from "@/lib/utils.ts";

interface TestimonialProps {
    image: string;
    name: string;
    userName: string;
    comment: string;
}

const testimonials: TestimonialProps[] = [
    {
        image: "https://github.com/shadcn.png",
        name: "Emily Smith",
        userName: "@emily_smith",
        comment: "This inventory management system has completely streamlined our stock control process!"
    },
    {
        image: "https://github.com/shadcn.png",
        name: "Michael Johnson",
        userName: "@michael_j",
        comment:
            "Managing our warehouse inventory has never been easier. The system's interface is intuitive and efficient."
    },
    {
        image: "https://github.com/shadcn.png",
        name: "Sarah Williams",
        userName: "@sarah_w",
        comment:
            "We used to struggle with overstock and shortages, but this system has provided us with real-time insights and better control."
    },
    {
        image: "https://github.com/shadcn.png",
        name: "David Brown",
        userName: "@david_b",
        comment:
            "The reporting tools in this inventory system have given us better visibility into our stock movements and trends."
    },
    {
        image: "https://github.com/shadcn.png",
        name: "Lisa Davis",
        userName: "@lisa_d",
        comment:
            "Since switching to this inventory solution, we've reduced costs and improved our overall stock management."
    },
    {
        image: "https://github.com/shadcn.png",
        name: "Tom Harris",
        userName: "@tom_h",
        comment:
            "The best part about this system is how easy it is to use, even for our non-technical staff."
    }
];

export const Testimonials = () => {
    return (
        <section
            id="testimonials"
            className="py-24 sm:py-32"
        >
            <h2 className="text-3xl md:text-4xl font-bold">
                Discover Why
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    {" "}
                    People Love{" "}
                </span>
                Our Inventory Management System
            </h2>

            <p className="text-xl text-muted-foreground pt-4 pb-2">
                Discover how our inventory management system is helping businesses efficiently manage
                their stock and optimize operations.
            </p>
            <p className="text-xl text-muted-foreground pb-8">
                Join companies that are transforming their inventory control today.
            </p>

            <div
                className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
                {testimonials.map(
                    ({ image, name, userName, comment }: TestimonialProps) => (
                        <Card
                            key={userName}
                            className="max-w-md md:break-inside-avoid overflow-hidden"
                        >
                            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                <Avatar>
                                    <AvatarImage
                                        alt=""
                                        src={image}
                                    />
                                    <AvatarFallback>
                                        {getUserInitials(name)}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex flex-col">
                                    <CardTitle className="text-lg">{name}</CardTitle>
                                    <CardDescription>{userName}</CardDescription>
                                </div>
                            </CardHeader>

                            <CardContent>{comment}</CardContent>
                        </Card>
                    )
                )}
            </div>
        </section>
    );
}
