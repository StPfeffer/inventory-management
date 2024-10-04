import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/home.tsx";
import LoginPage from "@/pages/auth/login.tsx";

function CustomRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    )
}

export default CustomRoutes;
