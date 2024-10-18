import { axiosInstance } from "@/lib/axios";
import { Customer } from "shared/types/customer";

export class CustomerService {

    list() {
        return axiosInstance.get("api/customers");
    }

    save(customer: Customer) {
        return axiosInstance.post("api/customers", customer);
    }

}
