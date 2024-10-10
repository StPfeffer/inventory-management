import { Button, buttonVariants } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { HeroCards } from "./hero-cards";

export const Hero = () => {
    return (
        <section id="hero" className="grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
            <div className="text-center lg:text-start space-y-6">
                <main className="text-5xl md:text-6xl font-bold">
                    <h1 className="inline">
                        <span className="inline bg-gradient-to-r from-[#E28FCF]  to-[#E11D48] text-transparent bg-clip-text">
                            Inventory
                        </span>{" "}
                        Management System
                    </h1>
                </main>

                <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
                    Take control of your inventory with our intuitive management system.
                    Start optimizing your stock and operations today!
                </p>

                <div className="space-y-4 md:space-y-0 md:space-x-4">
                    <Button className="w-full md:w-1/3 cursor-pointer">
                        <a
                            rel="noreferrer noopener"
                            href="/dashboard"
                            className="w-full md:w-1/3"
                        >
                            Get Started
                        </a>
                    </Button>

                    <a
                        rel="noreferrer noopener"
                        href="https://github.com/StPfeffer/inventory-management.git"
                        target="_blank"
                        className={`w-full md:w-1/3 ${buttonVariants({
                            variant: "outline",
                        })}`}
                    >
                        Github Repository
                        <GitHubLogoIcon className="relative ml-2 w-5 h-5" />
                    </a>
                </div>
            </div>

            <div className="z-10">
                <HeroCards />
            </div>

            <div className="hero-shadow"></div>
        </section>
    );
}
