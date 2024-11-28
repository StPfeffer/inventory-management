import { SupplierService } from "@/services/supplier-service";
import { ActionResponse } from "@/types/action";
import { Supplier } from "shared/types/supplier";
import { User } from "shared/types/user";

const supplierService = new SupplierService();

export const updateSupplier = async (id: number, supplier: Supplier): Promise<ActionResponse> => {
    try {
        const updatedUser = await supplierService.update(id, supplier);

        return {
            success: {
                message: "Supplier has been updated.",
                data: updatedUser.data as User
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to update the supplier, please try again later",
                data: []
            }
        };
    }
}
