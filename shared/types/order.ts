export interface Order {
    id?: number;
    date: Date;
    customerId: number;
    status: string;
    total: number;
}

export interface OrderItem {
    id?: number;
    orderId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
}

export type OrderStatus = "pending" | "processing" | "cancelled";

interface OrderStatusDetailsProps {
    type: OrderStatus,
    description: string;
}

export const orderStatusDetails: OrderStatusDetailsProps[] = [
    {
        type: "pending",
        description: "Pending",
    },
    {
        type: "processing",
        description: "Processing",
    },
    {
        type: "cancelled",
        description: "Cancelled",
    }
]