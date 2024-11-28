import { OrderService } from "@/services/order-service";
import { ActionResponse } from "@/types/action";
import { Order } from "shared/types/order";


const orderService = new OrderService();

export const fetchOrders = async (): Promise<ActionResponse> => {
    try {
        const orders = await orderService.list();

        return {
            success: {
                message: "",
                data: orders.data as Order[]
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to search for orders, please try again later",
                data: []
            }
        };
    }
}

export const fetchOrder = async (orderId: string): Promise<ActionResponse> => {
    try {
        const order = await orderService.find(parseInt(orderId));

        return {
            success: {
                message: "",
                data: order.data as Order
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to search for the order data, please try again later",
                data: []
            }
        };
    }
}