import { ProductService } from "@/services/product-service";
import { ActionResponse } from "@/types/action";

const productService = new ProductService();

export const deleteProduct = async (id: number): Promise<ActionResponse> => {
    try {
        await productService.delete(id);

        return {
            success: {
                message: "Product has been deleted.",
                data: null
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to delete the product, please try again later.",
                data: []
            }
        };
    }
}

export const batchDeleteProduct = async (ids: number[]): Promise<ActionResponse> => {
    try {
        await productService.batchDelete(ids);

        return {
            success: {
                message: "All selected products have been successfully deleted.",
                data: null
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "Unable to delete the selected products at this time. Please check your network connection or try again later.",
                data: null
            }
        };
    }
}
