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

}
