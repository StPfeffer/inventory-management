import {
    TrendingDown,
    Settings,
    TrendingUp,
    CreditCard,
    LayoutGrid,
    LucideIcon,
    ChartColumn
} from "lucide-react";

type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    disabled: boolean;
    icon: LucideIcon
    submenus: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/dashboard",
                    label: "Dashboard",
                    active: pathname.includes("/dashboard"),
                    disabled: false,
                    icon: LayoutGrid,
                    submenus: []
                },
                {
                    href: "/insights",
                    label: "Insights",
                    active: pathname.includes("/insights"),
                    disabled: true,
                    icon: ChartColumn,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: "Contents",
            menus: [
                {
                    href: "",
                    label: "Transactions",
                    active: pathname.includes("/posts"),
                    disabled: false,
                    icon: CreditCard,
                    submenus: [
                        {
                            href: "/transactions",
                            label: "Transactions",
                            active: pathname === "/transactions"
                        },
                        {
                            href: "/transactions/new",
                            label: "New Transaction",
                            active: pathname === "/transactions/new"
                        }
                    ]
                },
                {
                    href: "/incomes",
                    label: "Incomes",
                    active: pathname.includes("/incomes"),
                    disabled: false,
                    icon: TrendingUp,
                    submenus: []
                },
                {
                    href: "/expenses",
                    label: "Expenses",
                    active: pathname.includes("/expenses"),
                    disabled: false,
                    icon: TrendingDown,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: "Settings",
            menus: [
                {
                    href: "/account",
                    label: "Account",
                    active: pathname.includes("/account"),
                    disabled: false,
                    icon: Settings,
                    submenus: []
                }
            ]
        }
    ];
}