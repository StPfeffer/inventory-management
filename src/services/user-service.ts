// should fetch from an external API in the future
export class UserService {

    list() {
        return JSON.parse(localStorage.getItem("users") || "[]");
    }

}
