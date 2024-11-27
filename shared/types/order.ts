import { Customer } from "./customer";
import { Product } from "./product";

export interface Order {
    id?: number;
    date: Date;
    customer: Customer;
    status: OrderStatus;
    total: number;
}

export interface OrderItem {
    id?: number;
    orderId: number;
    product: Product;
    quantity: number;
    unitPrice: number;
}

export type OrderStatus = "pending" | "processing" | "cancelled";

interface OrderStatusDetailsProps {
    type: OrderStatus,
    description: string;
    color: string;
}

export const orderStatusDetails: OrderStatusDetailsProps[] = [
    {
        type: "pending",
        description: "Pending",
        color: ""
    },
    {
        type: "processing",
        description: "Processing",
        color: ""
    },
    {
        type: "cancelled",
        description: "Cancelled",
        color: ""
    }
]