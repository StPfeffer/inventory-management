import { axiosInstance } from "@/lib/axios";
import { OrderItem } from "shared/types/order";

export class OrderItemService {

    listItems() {
        return axiosInstance.get("api/orders/items");
    }

    listItemsByOrder(idOrder: number) {
        return axiosInstance.get("api/orders/" + idOrder + "/items");
    }

    findItem(id: number) {
        return axiosInstance.get("api/orders/items/" + id);
    }

    saveItem(orderItem: OrderItem) {
        return axiosInstance.post("api/orders/" + orderItem.orderId + "/items", orderItem);
    }

    updateItem(id: number, orderItem: OrderItem) {
        return axiosInstance.put("api/orders/" + orderItem.id + "/items/" + id, orderItem);
    }

    deleteItem(id: number) {
        return axiosInstance.delete("api/orders/items/" + id);
    }

    batchDeleteItems(ids: number[]) {
        return axiosInstance.post("api/orders/items/batch", ids);
    }

}