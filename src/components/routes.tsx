import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/home.tsx";
import LoginPage from "@/pages/auth/login.tsx";
import RegisterPage from "@/pages/auth/register.tsx";
import IncomesPage from "@/pages/transactions/incomes/page";
import ExpensesPage from "@/pages/transactions/expenses/page";
import DashboardPage from "@/pages/dashboard";
import DashboardLayout from "./admin-layout";
import TransactionsPage from "@/pages/transactions/transactions/page";

function CustomRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
            <Route path="/transactions" element={<DashboardLayout><TransactionsPage /></DashboardLayout>} />
            <Route path="/transactions/incomes" element={<DashboardLayout><IncomesPage /></DashboardLayout>} />
            <Route path="/transactions/expenses" element={<DashboardLayout><ExpensesPage /></DashboardLayout>} />
        </Routes>
    )
}

export default CustomRoutes;
