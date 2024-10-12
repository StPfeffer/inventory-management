import { Product } from "@/types/product";

export class ProductService {

    list(): Product[] {
        return JSON.parse(localStorage.getItem("transactions") || "[]");
    }

}
