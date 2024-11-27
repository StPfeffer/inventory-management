import { OrderItemService } from "@/services/order-item-service";
import { ActionResponse } from "@/types/action";

const orderItemService = new OrderItemService();

export const deleteOrderItem = async (id: number): Promise<ActionResponse> => {
    try {
        await orderItemService.deleteItem(id);

        return {
            success: {
                message: "Order item has been deleted.",
                data: null
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occured when trying to delete the order item, please try again later.",
                data: []
            }
        };
    }
}

export const batchDeleteOrderItem = async (ids: number[]): Promise<ActionResponse> => {
    try {
        await orderItemService.batchDeleteItems(ids);

        return {
            success: {
                message: "All selected order items has been successfully deleted.",
                data: null 
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "Unable to delete the selected order items at this time. Please check your network connection or try again later.",
                data: null
            }
        };
    }
}