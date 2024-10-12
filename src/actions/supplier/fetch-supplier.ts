import { SupplierService } from "@/services/supplier-service";

const supplierService = new SupplierService();

export function fetchSupplier(supplierId: number) {
    try {
        return supplierService.find(supplierId);
    } catch (error) {
        console.error(error);

        return null;
    }
}
