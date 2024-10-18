// should fetch from an external API in the future
export class ExpenseService {

    list() {
        return JSON.parse(localStorage.getItem("expenses") || "[]");
    }

    listRecents() {
        return JSON.parse(localStorage.getItem("expenses") || "[]");
    }

}
