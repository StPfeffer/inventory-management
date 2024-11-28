import { ProductService } from "@/services/product-service";
import { ActionResponse } from "@/types/action";
import { Product } from "shared/types/product";

const productService = new ProductService();

export const updateProduct = async (id: number, product: Product): Promise<ActionResponse> => {
    try {
        const updatedProduct = await productService.update(id, product);

        return {
            success: {
                message: "Product has been updated.",
                data: updatedProduct.data as Product
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to update the product, please try again later",
                data: []
            }
        };
    }
}
