import { axiosInstance } from "@/lib/axios";
import { Order } from "shared/types/order";

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

}
