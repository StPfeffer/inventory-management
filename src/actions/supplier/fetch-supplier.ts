import { SupplierService } from "@/services/supplier-service";
import { ActionResponse } from "@/types/action";
import { Supplier } from "shared/types/supplier";

const supplierService = new SupplierService();

export const fetchSuppliers = async (): Promise<ActionResponse> => {
    try {
      const suppliers = await supplierService.list();
  
      return {
        success: {
          message: "",
          data: suppliers.data as Supplier[]
        }
      };
    } catch (error: any) {
      console.log(error);
  
      return {
        error: {
          message: "An error occurred when trying to search for suppliers, please try again later",
          data: []
        }
      };
    }
  }
  
  export const fetchSupplier = async (supplierId: string): Promise<ActionResponse> => {
    try {
      const supplier = await supplierService.find(parseInt(supplierId));
  
      return {
        success: {
          message: "",
          data: supplier.data as Supplier
        }
      };
    } catch (error: any) {
      console.log(error);
  
      return {
        error: {
          message: "An error occurred when trying to search for the supplier data, please try again later",
          data: []
        }
      };
    }
  }
