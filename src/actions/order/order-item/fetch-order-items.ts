import { OrderItemService } from "@/services/order-item-service";
import { ActionResponse } from "@/types/action";
import { OrderItem } from "shared/types/order";


const orderItemService = new OrderItemService();

export const fetchOrderItems = async (): Promise<ActionResponse> => {
    try {
        const orderItems = await orderItemService.listItems();

        return {
            success: {
                message: "",
                data: orderItems.data as OrderItem[]
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to search for orders items, please try again later",
                data: []
            }
        };
    }
}

export const fetchOrderItemsByOrder = async (idOrder:number): Promise<ActionResponse> => {
    try {
        const orderItems = await orderItemService.listItemsByOrder(idOrder);

        return {
            success: {
                message: "",
                data: orderItems.data as OrderItem[]
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to search for orders items, please try again later",
                data: []
            }
        };
    }
}

export const fetchOrderItem = async (orderItemId: string): Promise<ActionResponse> => {
    try {
        const orderItem = await orderItemService.findItem(parseInt(orderItemId));

        return {
            success: {
                message: "",
                data: orderItem.data as OrderItem
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to search for the order item data, please try again later",
                data: []
            }
        };
    }
}