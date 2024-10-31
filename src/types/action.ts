export interface ActionResponse {
    success?: {
        message: string,
        data?: any,
    },
    error?: {
        message: string,
        data?: any,
    }
};
