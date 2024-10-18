export class SupplierService {

    list() {
        return JSON.parse(localStorage.getItem("transactions") || "[]");
    }

    find(id: number) {
        return JSON.parse(localStorage.getItem("suppliers") || "[]");
    }

}
