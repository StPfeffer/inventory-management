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

    update(id: number, product: Product) {
        return axiosInstance.put("api/products/" + id, product);
    }

    delete(id: number) {
        return axiosInstance.delete("api/products/" + id);
    }

    batchDelete(ids: number[]) {
        return axiosInstance.post("api/products/batch", ids);
    }

}
