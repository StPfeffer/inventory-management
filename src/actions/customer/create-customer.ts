import { CustomerService } from "@/services/customer-service";
import { ActionResponse } from "@/types/action";
import { Customer } from "shared/types/customer";

const customerService = new CustomerService();

export const createCustomer = async (customer: Customer): Promise<ActionResponse> => {
    try {
        const createdCustomer = await customerService.save(customer);

        return {
            success: {
                message: "Customer has been created.",
                data: createdCustomer.data as Customer
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to create the customer, please try again later",
                data: []
            }
        };
    }
}
