import { Supplier } from "@/types/supplier";

export class SupplierService {

    list(): Supplier[] {
        return JSON.parse(localStorage.getItem("transactions") || "[]");
    }

    find(id: number): Supplier {
        return JSON.parse(localStorage.getItem("suppliers") || "[]");
    }

}
