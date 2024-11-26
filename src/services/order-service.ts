import { axiosInstance } from "@/lib/axios";
import { Order, OrderItem } from "shared/types/order";

export class OrderService {

    list() {
        return axiosInstance.get("api/orders");
    }

    find(id: number) {
        return axiosInstance.get("api/orders/" + id);
    }

    save(order: Order) {
        return axiosInstance.post("api/orders", order);
    }

    update(id: number, order: Order) {
        return axiosInstance.put("api/orders/" + id, order);
    }

    delete(id: number) {
        return axiosInstance.delete("api/orders/" + id);
    }

    batchDelete(ids: number[]) {
        return axiosInstance.post("api/orders/batch", ids);
    }

    listItems() {
        return axiosInstance.get("api/items");
    }

    listItemsByOrder(idOrder: number) {
        return axiosInstance.get("api/items" + idOrder);
    }

    findItem(id: number) {
        return axiosInstance.get("api/items/" + id);
    }

    saveItem(orderItem: OrderItem) {
        return axiosInstance.post("api/items", orderItem);
    }

    updateItem(id: number, orderItem: OrderItem) {
        return axiosInstance.put("api/items/" + id, orderItem);
    }

    deleteItem(id: number) {
        return axiosInstance.delete("api/items/" + id);
    }

    batchDeleteItems(ids: number[]) {
        return axiosInstance.post("api/items/batch", ids);
    }

}
