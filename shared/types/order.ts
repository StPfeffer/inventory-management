export interface Order {
    id?: number;
    date: Date;
    customerId: number;
    status: string;
    total: number;
}

export interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
}