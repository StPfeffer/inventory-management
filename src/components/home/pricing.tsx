import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

enum PopularPlanType {
    NO = 0,
    YES = 1,
}

interface PricingProps {
    title: string;
    popular: PopularPlanType;
    price: number;
    description: string;
    buttonText: string;
    benefitList: string[];
}

const pricingList: PricingProps[] = [
    {
        title: "Starter",
        popular: 0,
        price: 0,
        description: "Perfect for small businesses to get started with our basic inventory management features.",
        buttonText: "Sign Up Free",
        benefitList: [
            "Basic Inventory Tracking",
            "Real-Time Stock Updates",
            "Basic Reporting Tools",
            "Community Support",
        ],
    },
    {
        title: "Business",
        popular: 1,
        price: 50,
        description: "Ideal for growing businesses, this plan offers more advanced inventory management tools and insights.",
        buttonText: "Start Free Trial",
        benefitList: [
            "All Starter Plan Features",
            "Advanced Reporting and Analytics",
            "Supplier Management",
            "Priority Customer Support",
        ],
    },
    {
        title: "Enterprise",
        popular: 0,
        price: 150,
        description: "Designed for large-scale operations with complex inventory needs and dedicated support.",
        buttonText: "Contact Sales",
        benefitList: [
            "All Business Plan Features",
            "Custom Integrations",
            "AI-Driven Stock Forecasting",
            "Dedicated Account Manager",
        ],
    },
];

export const Pricing = () => {
    return (
        <section id="pricing" className="py-16 sm:py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
                Flexible Pricing for
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    {" "}
                    Inventory Management
                </span>
            </h2>

            <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
                Discover the perfect plan for your business. From small startups
                to large enterprises, our system scales with you.
            </h3>

            <div className="flex justify-center">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pricingList.map((pricing: PricingProps) => (
                        <Card
                            key={pricing.title}
                            className={cn(
                                pricing.popular === PopularPlanType.YES
                                    ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                                    : ""
                                , "w-[330px]")}
                        >
                            <CardHeader>
                                <CardTitle className="flex item-center justify-between">
                                    {pricing.title}
                                    {pricing.popular === PopularPlanType.YES ? (
                                        <Badge
                                            variant="secondary"
                                            className="text-sm text-primary"
                                        >
                                            Most popular
                                        </Badge>
                                    ) : null}
                                </CardTitle>
                                <div>
                                    <span className="text-3xl font-bold">${pricing.price}</span>
                                    <span className="text-muted-foreground"> /month</span>
                                </div>

                                <CardDescription>{pricing.description}</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <Button className="w-full">{pricing.buttonText}</Button>
                            </CardContent>

                            <hr className="w-4/5 m-auto mb-4"/>

                            <CardFooter className="flex">
                                <div className="space-y-4">
                                    {pricing.benefitList.map((benefit: string) => (
                                        <span
                                            key={benefit}
                                            className="flex"
                                        >
                                            <Check className="text-green-500"/>{" "}
                                            <h3 className="ml-2">{benefit}</h3>
                                        </span>
                                    ))}
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
