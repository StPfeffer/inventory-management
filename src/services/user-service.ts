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

    update(id: number, user: User) {
        return axiosInstance.put("api/users/" + id, user);
    }

    delete(id: number) {
        return axiosInstance.delete("api/users/" + id);
    }

    batchDelete(ids: number[]) {
        return axiosInstance.post("api/users/batch", ids);
    }

}
