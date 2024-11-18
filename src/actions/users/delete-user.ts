import { UserService } from "@/services/user-service";
import { ActionResponse } from "@/types/action";

const userService = new UserService();

export const deleteUser = async (id: number): Promise<ActionResponse> => {
    try {
        await userService.delete(id);

        return {
            success: {
                message: "User has been deleted.",
                data: null
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "An error occurred when trying to delete the user, please try again later.",
                data: []
            }
        };
    }
}

export const batchDeleteUser = async (ids: number[]): Promise<ActionResponse> => {
    try {
        await userService.batchDelete(ids);

        return {
            success: {
                message: "All selected users have been successfully deleted.",
                data: null
            }
        };
    } catch (error: any) {
        console.error(error);

        return {
            error: {
                message: "Unable to delete the selected users at this time. Please check your network connection or try again later.",
                data: null
            }
        };
    }
}
