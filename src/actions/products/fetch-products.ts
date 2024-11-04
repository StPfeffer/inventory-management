import { ProductService } from "@/services/product-service";
import { ActionResponse } from "@/types/action";
import { Product } from "shared/types/product";

const productService = new ProductService();

export const fetchProducts = async (): Promise<ActionResponse> => {
    try {
        const products = await productService.list();

        return {
            success: {
                message: "",
                data: products.data as Product[]
            }
        };
    } catch (error: any) {
        console.log(error);

        return {
            error: {
                message: "An error occurred when trying to search for products, please try again later",
                data: []
            }
        };
    }
}

export const fetchProduct = async (productId: string): Promise<ActionResponse> => {
    try {
        const product = await productService.find(parseInt(productId));

        return {
            success: {
                message: "",
                data: product.data as Product
            }
        };
    } catch (error: any) {
        console.log(error);

        return {
            error: {
                message: "An error occurred when trying to search for the product data, please try again later",
                data: []
            }
        };
    }
}
