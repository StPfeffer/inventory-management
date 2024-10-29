import { axiosInstance } from "@/lib/axios";
import { Transaction } from "shared/types/transaction";

export class IncomeService {

    list() {
        return axiosInstance.get("api/transactions?type=entry");
    }

    listRecents() {
        return axiosInstance.get("api/transactions/recents?type=entry");
    }

    find(id: number) {
        return axiosInstance.get("api/transactions/" + id + "?type=entry");
    }

    save(transaction: Transaction) {
        return axiosInstance.post("api/transactions", transaction);
    }

}
