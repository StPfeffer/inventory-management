import { UserService } from "@/services/user-service";
import { ActionResponse } from "@/types/action";
import { User } from "shared/types/user";

const userService = new UserService();

export const updateUser = async (id: number, user: User): Promise<ActionResponse> => {
    try {
        const updatedUser = await userService.update(id, user);

        return {
            success: {
                message: "User has been updated.",
                data: updatedUser.data as User
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to update the user, please try again later",
                data: []
            }
        };
    }
}
