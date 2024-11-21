import { OrderService } from "@/services/order-service";
import { ActionResponse } from "@/types/action";

const orderService = new OrderService();

export const deleteOrder = async (id: number): Promise<ActionResponse> => {
    try {
        await orderService.delete(id);

        return {
            success: {
                message: "Order has been deleted.",
                data: null
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occured when trying to delete the customer, please try again later.",
                data: []
            }
        };
    }
}

export const batchDeleteOrder = async (ids: number[]): Promise<ActionResponse> => {
    try {
        await orderService.batchDelete(ids);

        return {
            success: {
                message: "All selected orders has been successfully deleted.",
                data: null 
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "Unable to delete the selected orders at this time. Please check your network connection or try again later.",
                data: null
            }
        };
    }
}