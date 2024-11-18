import { SupplierService } from "@/services/supplier-service";
import { ActionResponse } from "@/types/action";
import { Supplier } from "shared/types/supplier";

const supplierService = new SupplierService();

export const createSupplier = async (supplier: Supplier): Promise<ActionResponse> => {
    try {
        const createdSupplier = await supplierService.save(supplier);

        return {
            success: {
                message: "Supplier has been created.",
                data: createdSupplier.data as Supplier
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to create the supplier, please try again later",
                data: []
            }
        };
    }
}
