import {
    TrendingDown,
    TrendingUp
} from "lucide-react";

export interface Transaction {
    id?: number;
    date: Date;
    type: TransactionType;
    price: number;
    productId: number | null;
    orderId: number | null;
}

export type TransactionType = "entry" | "exit";

interface TransactionTypeDetailsProps {
    type: TransactionType,
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}

export const transactionTypeDetails: TransactionTypeDetailsProps[] = [
    {
        type: "entry",
        description: "Entry",
        icon: TrendingUp
    },
    {
        type: "exit",
        description: "Exit",
        icon: TrendingDown
    }
]