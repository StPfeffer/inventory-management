import { User } from "@/types/user";

// should fetch from an external API in the future
export class UserService {

    findById(id: number): User | null {
        const expense = this.list().filter(e => e.id === id).at(0);
        return expense === undefined ? null : expense;
    }

    list(): User[] {
        return JSON.parse(localStorage.getItem("users") || "[]");
    }

}
