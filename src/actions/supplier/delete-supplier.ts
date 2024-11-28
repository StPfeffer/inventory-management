import { SupplierService } from "@/services/supplier-service";
import { ActionResponse } from "@/types/action";

const supplierService = new SupplierService();

export const deleteSupplier = async (id: number): Promise<ActionResponse> => {
    try {
        await supplierService.delete(id);

        return {
            success: {
                message: "Supplier has been deleted.",
                data: null
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to delete the supplier, please try again later.",
                data: []
            }
        };
    }
}

export const batchDeleteSupplier = async (ids: number[]): Promise<ActionResponse> => {
    try {
        await supplierService.batchDelete(ids);

        return {
            success: {
                message: "All selected suppliers have been successfully deleted.",
                data: null
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "Unable to delete the selected suppliers at this time. Please check your network connection or try again later.",
                data: null
            }
        };
    }
}
