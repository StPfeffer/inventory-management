import { NavLinkProps } from "@/components/navbar/types";

export function getNavLinks(): NavLinkProps[] {
    return [
        {
            href: "/",
            label: "Home"
        },
        {
            href: "/dashboard",
            label: "Dashboard"
        },
        {
            href: "/about",
            label: "About"
        }
    ]
}