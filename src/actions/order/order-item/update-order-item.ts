import { OrderService } from "@/services/order-service";
import { ActionResponse } from "@/types/action";
import { OrderItem } from "shared/types/order";

const orderItemService = new OrderService();

export const updateOrderItem = async (id: number, orderItem: OrderItem): Promise<ActionResponse> => {
    try {
        const updatedOrderItem = await orderItemService.updateItem(id, orderItem);

        return {
            success: {
                message: "Order Item has been updated.",
                data: updatedOrderItem.data as OrderItem
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to update the order item, please try again later",
                data: []
            }
        };
    }
}