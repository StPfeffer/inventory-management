import { Button, buttonVariants } from "@/components/ui/button";
import { RefreshCcwIcon } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { VariantProps } from "class-variance-authority";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface RefreshButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    tooltipContent?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({
    tooltipContent = "Refresh",
    onClick
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        setIsLoading(true);

        if (onClick) {
            onClick(event);
        } else {
            window.location.reload();
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={handleClick}>
                        <RefreshCcwIcon className={cn(isLoading && "animate-spin")} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{`${isLoading ? "Refreshing..." : tooltipContent}`}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
RefreshButton.displayName = "RefreshButton"

export default RefreshButton;
