import { axiosInstance } from "@/lib/axios";
import { Transaction } from "shared/types/transaction";

export class ExpenseService {

    list() {
        return axiosInstance.get("api/transactions?type=exit");
    }

    listRecents() {
        return axiosInstance.get("api/transactions/recents?type=exit");
    }

    find(id: number) {
        return axiosInstance.get("api/transactions/" + id + "?type=exit");
    }

    save(transaction: Transaction) {
        return axiosInstance.post("api/transactions", transaction);
    }

}
