import { ContentLayout } from "@/components/admin-panel/layout/content-layout";
import { calculateCardInfo } from "@/components/admin-panel/dashboard/card/helper";
import { CardInfo } from "@/components/admin-panel/dashboard/card/types";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Dashboard from "@/components/admin-panel/dashboard/dashboard";
import { fetchRecentTransactions, fetchTransactions } from "@/actions/fetch-transaction";
import { useAuth } from "@/components/auth/auth-context-provider";

const DashboardPage = () => {
    const {user} = useAuth();

    const transactions = fetchRecentTransactions(user!.id);
    const cardInfo: CardInfo[] = calculateCardInfo(fetchTransactions(user!.id));

    return (
        <ContentLayout title="Dashboard">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <a href="/">
                                Home
                            </a>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Dashboard
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Dashboard
                cardInfo={cardInfo}
                transactions={transactions}
            />
        </ContentLayout>
    );
}

export default DashboardPage;
