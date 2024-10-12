import { ProductService } from "@/services/product-service";

const productService = new ProductService();

export function fetchProducts() {
    try {
        const products = productService.list();

        return products as [];
    } catch (error) {
        console.error(error);

        return [];
    }
}
