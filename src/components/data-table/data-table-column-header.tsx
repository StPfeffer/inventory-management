import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
    ChevronDownIcon,
    ChevronsUpDown,
    ChevronUpIcon,
    EyeIcon
} from "lucide-react";

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
    sort?: boolean;
};

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    sort = true,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>;
    }

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                        <span>{title}</span>

                        {sort && column.getIsSorted() === "desc" ? (
                            <ChevronDownIcon className="ml-2 h-4 w-4" color="hsl(var(--primary))" />
                        ) : sort && column.getIsSorted() === "asc" ? (
                            <ChevronUpIcon className="ml-2 h-4 w-4" color="hsl(var(--primary))" />
                        ) : sort && (
                            <ChevronsUpDown className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start">
                    {sort &&
                        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                            <ChevronUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                            Asc
                        </DropdownMenuItem>
                    }
                    {sort &&
                        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                            <ChevronDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                            Desc
                        </DropdownMenuItem>
                    }
                    {sort &&
                        <DropdownMenuSeparator />
                    }

                    <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                        <EyeIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Hide
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div >
    );
}
