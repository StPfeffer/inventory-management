import {
    Settings,
    CreditCard,
    LayoutGrid,
    LucideIcon,
    ChartColumn,
    PackageSearch,
    TrendingUp,
    TrendingDown,
    Package,
    ShoppingCart,
    Store,
    Users,
    UserRound
} from "lucide-react";

export type Submenu = {
    href: string;
    label: string;
    active: boolean;
    icon?: LucideIcon;
    disabled?: boolean;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    disabled?: boolean;
    icon: LucideIcon;
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
                    label: "Inventory",
                    active: pathname.includes("/inventory"),
                    icon: PackageSearch,
                    submenus: [
                        {
                            href: "/inventory",
                            label: "Inventory",
                            active: pathname === "/inventory",
                            disabled: true
                        },
                        {
                            href: "/inventory/products",
                            label: "Products",
                            active: pathname.includes("/inventory/products"),
                            icon: ShoppingCart
                        },
                        {
                            href: "/inventory/suppliers",
                            label: "Suppliers",
                            active: pathname.includes("/inventory/suppliers"),
                            icon: Package
                        }
                    ]
                },
                {
                    href: "/orders",
                    label: "Orders",
                    active: pathname.includes("/orders"),
                    icon: Store,
                    submenus: []
                },
                {
                    href: "/customers",
                    label: "Customers",
                    active: pathname.includes("/customers"),
                    icon: UserRound,
                    submenus: []
                },
                {
                    href: "",
                    label: "Transactions",
                    active: pathname.includes("/transactions"),
                    icon: CreditCard,
                    submenus: [
                        {
                            href: "/transactions",
                            label: "Transactions",
                            active: pathname === "/transactions"
                        },
                        {
                            href: "/transactions/incomes",
                            label: "Incomes",
                            active: pathname.includes("/transactions/incomes"),
                            icon: TrendingUp
                        },
                        {
                            href: "/transactions/expenses",
                            label: "Expenses",
                            active: pathname.includes("/transactions/expenses"),
                            icon: TrendingDown
                        }
                    ]
                },
                {
                    href: "/users",
                    label: "Users",
                    active: pathname.includes("/users"),
                    icon: Users,
                    submenus: []
                },
            ]
        },
        {
            groupLabel: "Settings",
            menus: [
                {
                    href: "/settings/account",
                    label: "Account",
                    active: pathname.includes("/settings/account"),
                    icon: Settings,
                    submenus: []
                }
            ]
        }
    ];
}