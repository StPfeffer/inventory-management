import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export const Newsletter = () => {
    return (
        <section id="newsletter">
            <Separator className="mx-auto" />

            <div className="py-24 sm:py-32">
                <h3 className="text-center text-4xl md:text-5xl font-bold">
                    Stay Updated with Our{" "}
                    <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                        Inventory Tips
                    </span>
                </h3>
                <p className="text-xl text-muted-foreground text-center mt-4 mb-8">
                    Get the latest updates on inventory management strategies and best practices delivered straight to your inbox.
                </p>

                <form className="flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2">
                    <Input
                        placeholder="your-email@example.com"
                        className="bg-muted/50 dark:bg-muted/80"
                        aria-label="email"
                    />
                    <Button>
                        Subscribe
                    </Button>
                </form>
            </div>

            <Separator className="mx-auto" />
        </section>
    );
}
