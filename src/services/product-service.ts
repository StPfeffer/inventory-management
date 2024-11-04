import { axiosInstance } from "@/lib/axios";
import { Product } from "shared/types/product";

export class ProductService {

    list() {
        return axiosInstance.get("api/products");
    }

    find(id: number) {
        return axiosInstance.get("api/products/" + id);
    }

    save(product: Product) {
        return axiosInstance.post("api/products", product);
    }

}
