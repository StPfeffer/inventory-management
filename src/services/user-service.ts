import { axiosInstance } from "@/lib/axios";
import { User } from "shared/types/user";

export class UserService {

    list() {
        return axiosInstance.get("api/users");
    }

    find(id: number) {
        return axiosInstance.get("api/users/" + id);
    }

    save(user: User) {
        return axiosInstance.post("api/users", user);
    }

}
