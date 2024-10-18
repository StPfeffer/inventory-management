// should fetch from an external API in the future
export class IncomeService {

    list() {
        return JSON.parse(localStorage.getItem("incomes") || "[]");
    }

    listRecents() {
        return JSON.parse(localStorage.getItem("expenses") || "[]");
    }

}
