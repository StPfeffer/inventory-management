import { axiosInstance } from "@/lib/axios";
import { Customer } from "shared/types/customer";

export class CustomerService {

    list() {
        return axiosInstance.get("api/customers");
    }

    find(id: number) {
        return axiosInstance.get("api/customers/" + id);
    }

    save(customer: Customer) {
        return axiosInstance.post("api/customers", customer);
    }

    update(id: number, customer: Customer) {
        return axiosInstance.put("api/customers/" + id, customer);
    }

    delete(id: number) {
        return axiosInstance.delete("api/customers/" + id);
    }

    batchDelete(ids: number[]) {
        return axiosInstance.post("api/customers/batch", ids);
    }

}
