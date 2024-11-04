import { UserService } from "@/services/user-service";
import { ActionResponse } from "@/types/action";
import { User } from "shared/types/user";

const userService = new UserService();

export const fetchUsers = async (): Promise<ActionResponse> => {
    try {
        const users = await userService.list();

        return {
            success: {
                message: "",
                data: users.data as User[]
            }
        };
    } catch (error: any) {
        console.log(error);

        return {
            error: {
                message: "An error occurred when trying to search for users, please try again later",
                data: []
            }
        };
    }
}

export const fetchUser = async (userId: string): Promise<ActionResponse> => {
    try {
        const user = await userService.find(parseInt(userId));

        return {
            success: {
                message: "",
                data: user.data as User
            }
        };
    } catch (error: any) {
        console.log(error);

        return {
            error: {
                message: "An error occurred when trying to search for the user data, please try again later",
                data: []
            }
        };
    }
}
