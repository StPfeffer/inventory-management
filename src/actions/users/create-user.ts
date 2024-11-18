import { UserService } from "@/services/user-service";
import { ActionResponse } from "@/types/action";
import { User } from "shared/types/user";

const userService = new UserService();

export const createUser = async (user: User): Promise<ActionResponse> => {
    try {
        const createdUser = await userService.save(user);

        return {
            success: {
                message: "User has been created.",
                data: createdUser.data as User
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to create the user, please try again later",
                data: []
            }
        };
    }
}
