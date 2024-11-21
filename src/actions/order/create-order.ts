import { OrderService } from "@/services/order-service";
import { ActionResponse } from "@/types/action";
import { Order } from "shared/types/order";

const orderService = new OrderService();

export const createOrder = async (order: Order): Promise<ActionResponse> => {
    try {
        const createdOrder = await orderService.save(order);

        return {
            success: {
                message: "Order has been created.",
                data: createdOrder.data as Order
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to create the order, please try again later",
                data: []
            }
        }
    }
}