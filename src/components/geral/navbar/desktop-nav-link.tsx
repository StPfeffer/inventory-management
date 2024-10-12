import { getNavLinks } from "@/lib/nav-links";
import {
    NavigationMenuLink,
    NavigationMenuList
} from "../../ui/navigation-menu";

const DesktopNavLinks = () => {
    const links = getNavLinks();

    return (
        <NavigationMenuList>
            {links.map((link, i) => (
                <NavigationMenuLink asChild key={i}>
                    <a
                        href={link.href}
                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                    >
                        {link.label}
                    </a>
                </NavigationMenuLink>
            ))}
        </NavigationMenuList>
    )
}

export default DesktopNavLinks;
