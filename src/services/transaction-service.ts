// should fetch from an external API in the future
export class TransactionService {


    list() {
        return JSON.parse(localStorage.getItem("transactions") || "[]");
    }

    listRecents() {
        return JSON.parse(localStorage.getItem("expenses") || "[]");
    }

}
