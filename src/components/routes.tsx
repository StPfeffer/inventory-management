import {
    Route,
    Routes
} from "react-router-dom";
import HomePage from "@/pages/home.tsx";
import LoginPage from "@/pages/auth/login.tsx";
import RegisterPage from "@/pages/auth/register.tsx";
import IncomesPage from "@/pages/transactions/incomes/page";
import ExpensesPage from "@/pages/transactions/expenses/page";
import DashboardPage from "@/pages/dashboard";
import DashboardLayout from "./admin-layout";
import TransactionsPage from "@/pages/transactions/page";
import ProductsPage from "@/pages/products/page";
import CustomersPage from "@/pages/customers/page";
import CustomerDetailsPage from "@/pages/customers/details";
import ProductDetailsPage from "@/pages/products/details";
import SuppliersPage from "@/pages/supplier/page";
import SupplierDetailsPage from "@/pages/supplier/details";
import UsersPage from "@/pages/users/page";
import UserDetailsPage from "@/pages/users/details";
import OrdersPage from "@/pages/orders/page";
import OrdersDetailsPage from "@/pages/orders/details";

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
            <Route path="/inventory/products" element={<DashboardLayout><ProductsPage /></DashboardLayout>} />
            <Route path="/inventory/products/:productId" element={<DashboardLayout><ProductDetailsPage /></DashboardLayout>} />
            <Route path="/inventory/suppliers" element={<DashboardLayout><SuppliersPage /></DashboardLayout>} />
            <Route path="/inventory/suppliers/:supplierId" element={<DashboardLayout><SupplierDetailsPage /></DashboardLayout>} />
            <Route path="/customers" element={<DashboardLayout><CustomersPage /></DashboardLayout>} />
            <Route path="/customers/:customerId" element={<DashboardLayout><CustomerDetailsPage /></DashboardLayout>} />
            <Route path="/users" element={<DashboardLayout><UsersPage /></DashboardLayout>} />
            <Route path="/users/:userId" element={<DashboardLayout><UserDetailsPage /></DashboardLayout>} />
            <Route path="/orders" element={<DashboardLayout><OrdersPage /></DashboardLayout>} />
            <Route path="/orders/details" element={<DashboardLayout><OrdersDetailsPage /></DashboardLayout>} />
        </Routes>
    )
}

export default CustomRoutes;
