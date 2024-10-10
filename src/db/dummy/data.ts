import { paymentMethodsDetails } from "@/types/transaction";
import { User } from "@/types/user";
import { ArrowDown, ArrowRight, TrendingDown, TrendingUp } from "lucide-react";

export const categories = [
  {
    value: "expense",
    label: "Expense",
    icon: TrendingDown,
  },
  {
    value: "income",
    label: "Income",
    icon: TrendingUp,
  }
];

export const types = [
  {
    value: "debit",
    label: "Debit",
    icon: ArrowDown,
  },
  {
    value: "credit",
    label: "Credit",
    icon: ArrowRight,
  }
];

export const cardBrands = [
  {
    value: "Alipay",
    label: "Alipay",
    icon: undefined,
  },
  {
    value: "Amex",
    label: "Amex",
    icon: undefined,
  },
  {
    value: "Code",
    label: "Code",
    icon: undefined,
  },
  {
    value: "CodeFront",
    label: "CodeFront",
    icon: undefined,
  },
  {
    value: "Diners",
    label: "Diners",
    icon: undefined,
  },
  {
    value: "Discover",
    label: "Discover",
    icon: undefined,
  },
  {
    value: "Elo",
    label: "Elo",
    icon: undefined,
  },
  {
    value: "Generic",
    label: "Generic",
    icon: undefined,
  },
  {
    value: "Hiper",
    label: "Hiper",
    icon: undefined,
  },
  {
    value: "Hipercard",
    label: "Hipercard",
    icon: undefined,
  },
  {
    value: "Jcb",
    label: "Jcb",
    icon: undefined,
  },
  {
    value: "Maestro",
    label: "Maestro",
    icon: undefined,
  },
  {
    value: "Mastercard",
    label: "Mastercard",
    icon: undefined,
  },
  {
    value: "Mir",
    label: "Mir",
    icon: undefined,
  },
  {
    value: "Paypal",
    label: "Paypal",
    icon: undefined,
  },
  {
    value: "Unionpay",
    label: "Unionpay",
    icon: undefined,
  },
  {
    value: "Visa",
    label: "Visa",
    icon: undefined,
  },
]

export const paymentMethods = transformPaymentMethods();

function transformPaymentMethods() {
  return Object.entries(paymentMethodsDetails).map(([key, details]) => ({
    value: key,
    label: details.label,
    icon: details.icon
  }));
}

export const users: User[] = [
  {
    id: 1,
    name: "Administrator",
    username: "admin",
    email: "admin@admin.com",
    password: "admin",
  },
  {
    id: 2,
    name: "Mateus Pfeffer",
    username: "mpfeffer",
    email: "mpfeffer@minha.fag.edu.br",
    password: "mateus123"
  },
  {
    id: 3,
    name: "Jeferson Eduardo Guido",
    username: "jefersong",
    email: "jefersonguido@fag.edu.br",
    password: "jeferson123"
  }
]