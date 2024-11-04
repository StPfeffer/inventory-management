import { axiosInstance } from "@/lib/axios";
import { Supplier } from "shared/types/supplier";

export class SupplierService {

    list() {
        return axiosInstance.get("api/suppliers");
    }

    find(id: number) {
        return axiosInstance.get("api/suppliers/" + id);
    }

    save(supplier: Supplier) {
        return axiosInstance.post("api/suppliers", supplier);
    }

}
