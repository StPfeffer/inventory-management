import { DollarSign } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactElement } from "react";
import { cn } from "@/lib/utils";
import React from "react";

interface DashboardCardProps {
  label: string;
  value: string;
  textColor: string;
  description: string;
  icon?: ReactElement;
}

export default function CardTotal({
  label,
  value,
  textColor,
  description,
  icon = <DollarSign className="h-4 w-4 text-muted-foreground" />,
}: DashboardCardProps) {
  const IconWithClassName = () => {
    if (icon && icon.props && icon.props.className) {
      return React.cloneElement(icon, {
        className: `${icon.props.className} h-4 w-4 text-muted-foreground`,
      });
    }

    return icon;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <IconWithClassName />
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={cn(
          "text-xs text-muted-foreground",
          textColor
        )}>
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
