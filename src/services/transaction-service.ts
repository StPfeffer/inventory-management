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

}
