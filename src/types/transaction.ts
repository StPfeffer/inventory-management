import { Banknote, Bitcoin, Circle, CircleDollarSign, CreditCard, DollarSign, Landmark, Receipt, TrendingDown, TrendingUp } from "lucide-react";

export type Transaction = Income | Expense;

interface BaseTransaction {
    id: number;
    description: string;
    amount: number;
    date: string;
    notes?: string;
    category: TransactionCategory;
    createdAt: string;
    updatedAt: string;
    recurring?: boolean;
    userId: number;
}

export interface Income extends BaseTransaction {
}

export interface Expense extends BaseTransaction {
    type: PaymentType;
    paymentMethod: PaymentMethod;
    cardBrand?: CardBrand;
    transactionId: string | null;
}

export type PaymentType = "credit" | "debit";

interface PaymentTypeDetails {
    key: PaymentType;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

export const paymentTypeDetails: PaymentTypeDetails[] = [
    {
        key: "credit",
        label: "Credit",
        icon: CreditCard
    },
    {
        key: "debit",
        label: "Debit",
        icon: DollarSign
    }
];

export type TransactionCategory = "income" | "expense";

interface TransactionCategoryDetails {
    key: TransactionCategory;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

export const transactionCategoriesDetails: TransactionCategoryDetails[] = [
    {
        key: "income",
        label: "Income",
        icon: TrendingUp
    },
    {
        key: "expense",
        label: "Expense",
        icon: TrendingDown
    }
];

export type PaymentMethod =
    | "credit_card"
    | "debit_card"
    | "cash"
    | "paypal"
    | "bank_transfer"
    | "crypto"
    | "check"
    | "other";

export type CardBrand =
    | "Alipay"
    | "Amex"
    | "Code"
    | "CodeFront"
    | "Diners"
    | "Discover"
    | "Elo"
    | "Generic"
    | "Hiper"
    | "Hipercard"
    | "Jcb"
    | "Maestro"
    | "Mastercard"
    | "Mir"
    | "Paypal"
    | "Unionpay"
    | "Visa";

export const cardBrands: CardBrand[] = [
    "Alipay",
    "Amex",
    "Code",
    "CodeFront",
    "Diners",
    "Discover",
    "Elo",
    "Generic",
    "Hiper",
    "Hipercard",
    "Jcb",
    "Maestro",
    "Mastercard",
    "Mir",
    "Paypal",
    "Unionpay",
    "Visa"
];

interface PaymentMethodDetails {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

export const paymentMethodsDetails: Record<PaymentMethod, PaymentMethodDetails> = {
    credit_card: {
        label: "Credit Card",
        icon: CreditCard
    },
    debit_card: {
        label: "Debit Card",
        icon: CreditCard
    },
    cash: {
        label: "Cash",
        icon: Banknote
    },
    paypal: {
        label: "PayPal",
        icon: CircleDollarSign
    },
    bank_transfer: {
        label: "Bank Transfer",
        icon: Landmark
    },
    crypto: {
        label: "Cryptocurrency",
        icon: Bitcoin
    },
    check: {
        label: "Check",
        icon: Receipt
    },
    other: {
        label: "Other",
        icon: Circle
    }
};