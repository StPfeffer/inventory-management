import { axiosInstance } from "@/lib/axios";
import { Transaction } from "shared/types/transaction";

export class TransactionService {


    list() {
        return axiosInstance.get("api/transactions");
    }

    listRecents() {
        return axiosInstance.get("api/transactions/recents");
    }

    find(id: number) {
        return axiosInstance.get("api/transactions/" + id);
    }

    save(transaction: Transaction) {
        return axiosInstance.post("api/transactions", transaction);
    }

    update(id: number, transaction: Transaction) {
        return axiosInstance.put("api/transactions/" + id, transaction);
    }

    delete(id: number) {
        return axiosInstance.delete("api/transactions/" + id);
    }

    batchDelete(ids: number[]) {
        return axiosInstance.post("api/transactions/batch", ids);
    }

}
