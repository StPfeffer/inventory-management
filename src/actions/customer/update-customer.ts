import { CustomerService } from "@/services/customer-service";
import { ActionResponse } from "@/types/action";
import { Customer } from "shared/types/customer";

const customerService = new CustomerService();

export const updateCustomer = async (id: number, customer: Customer): Promise<ActionResponse> => {
    try {
        const updatedCustomer = await customerService.update(id, customer);

        return {
            success: {
                message: "Customer has been updated.",
                data: updatedCustomer.data as Customer
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to update the customer, please try again later",
                data: []
            }
        };
    }
}
