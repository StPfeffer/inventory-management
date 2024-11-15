import { CustomerService } from "@/services/customer-service";
import { ActionResponse } from "@/types/action";
import { Customer } from "shared/types/customer";

const customerService = new CustomerService();

export const fetchCustomers = async (): Promise<ActionResponse> => {
    try {
        const customers = await customerService.list();

        return {
            success: {
                message: "",
                data: customers.data as Customer[]
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to search for customers, please try again later",
                data: []
            }
        };
    }
}

export const fetchCustomer = async (customerId: string): Promise<ActionResponse> => {
    try {
        const customer = await customerService.find(parseInt(customerId));

        return {
            success: {
                message: "",
                data: customer.data as Customer
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to search for the customer data, please try again later",
                data: []
            }
        };
    }
}