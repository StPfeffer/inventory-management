export class ProductService {

    list() {
        return JSON.parse(localStorage.getItem("transactions") || "[]");
    }

}
