import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { getNavLinks } from "@/lib/nav-links";
import MountainIcon from "@/components/icon/mountain.tsx";
import { Button } from "@/components/ui/button.tsx";
import { MenuIcon } from "lucide-react";

const MobileNavLinks = () => {
    const links = getNavLinks();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                    <MenuIcon className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>

            <SheetContent side="left">
                <a href="#">
                    <MountainIcon className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                </a>

                <div className="grid gap-2 py-6">
                    {links.map((link, i) => (
                        <a
                            key={i}
                            href={link.href}
                            className="flex w-full items-center py-2 text-lg font-semibold"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNavLinks;
