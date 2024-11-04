import axios from "axios";

const url = process.env.NODE_ENV != "development" ? process.env.BASE_URL : "http://localhost:3001";

export const axiosInstance = axios.create({
    baseURL: url,
    timeout: 5000,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
});
