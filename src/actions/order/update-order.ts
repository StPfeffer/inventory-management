import { OrderService } from "@/services/order-service";
import { ActionResponse } from "@/types/action";
import { Order } from "shared/types/order";

const orderService = new OrderService();

export const updateOrder = async (id: number, order: Order): Promise<ActionResponse> => {
    try {
        const updatedOrder = await orderService.update(id, order);

        return {
            success: {
                message: "Order has been updated.",
                data: updatedOrder.data as Order
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to update the order, please try again later",
                data: []
            }
        };
    }
}