import { OrderService } from "@/services/order-service";
import { ActionResponse } from "@/types/action";
import { OrderItem } from "shared/types/order";

const orderItemService = new OrderService();

export const createOrderItem = async (orderItem: OrderItem): Promise<ActionResponse> => {
    try {
        const createdOrderItem = await orderItemService.saveItem(orderItem);

        return {
            success: {
                message: "Order Item has been created.",
                data: createdOrderItem.data as OrderItem
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to create the order item, please try again later",
                data: []
            }
        }
    }
}