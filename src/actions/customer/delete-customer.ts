import { CustomerService } from "@/services/customer-service";
import { ActionResponse } from "@/types/action";

const customerService = new CustomerService();

export const deleteCustomer = async (id: number): Promise<ActionResponse> => {
    try {
        await customerService.delete(id);

        return {
            success: {
                message: "Customer has been deleted.",
                data: null
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to delete the customer, please try again later.",
                data: []
            }
        };
    }
}

export const batchDeleteCustomer = async (ids: number[]): Promise<ActionResponse> => {
    try {
        await customerService.batchDelete(ids);

        return {
            success: {
                message: "All selected customers have been successfully deleted.",
                data: null
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "Unable to delete the selected customers at this time. Please check your network connection or try again later.",
                data: null
            }
        };
    }
}
