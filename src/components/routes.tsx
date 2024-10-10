import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/home.tsx";
import LoginPage from "@/pages/auth/login.tsx";
import CostumerPage from "@/pages/costumer";

function CustomRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/costumer" element={<CostumerPage />} />
        </Routes>
    )
}

export default CustomRoutes;
