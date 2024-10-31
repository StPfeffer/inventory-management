import { ProductService } from "@/services/product-service";
import { ActionResponse } from "@/types/action";
import { Product } from "shared/types/product";

const productService = new ProductService();

export const createProduct = async (product: Product): Promise<ActionResponse> => {
    try {
        const createdProduct = await productService.save(product);

        return {
            success: {
                message: "Product has been created.",
                data: createdProduct.data as Product
            }
        };
    } catch (error: any) {
        console.log(error);

        return {
            error: {
                message: "An error occurred when trying to create the product, please try again later",
                data: []
            }
        };
    }
}
