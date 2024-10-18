import { ContentLayout } from "@/components/admin-panel/layout/content-layout";
import { DataTable } from "@/components/data-table/data-table";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Customer } from "shared/types/customer";
import { useEffect, useState } from "react";
import { fetchCustomers } from "@/actions/customer/fetch-customers";
import { useToast } from "@/hooks/use-toast";
import { customerColumns } from "@/components/admin-panel/customers/data-table/columns/customer-columns";
import NewCustomerDialog from "@/components/admin-panel/customers/dialog/new-customer-dialog";

const CustomersPage = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);

    const { toast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedCustomers = await fetchCustomers();

            if (fetchedCustomers.error) {
                toast({
                    title: "Error",
                    description: fetchedCustomers.error.message
                })
            } else {
                setCustomers(fetchedCustomers?.success?.data);
            }
        };

        fetchData();
    }, []);

    const addCustomer = (newCustomer: Customer) => {
        const updatedCustomers = [...customers, newCustomer];
        setCustomers(updatedCustomers);
        localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    };

    return (
        <ContentLayout title="Customers">
            <div className="flex w-full justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <a href="/">
                                    Home
                                </a>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                Customers
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Card
                    className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                >
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>
                                Customers
                            </CardTitle>
                            <CardDescription>
                                A detailed overview of all customers.
                            </CardDescription>
                        </div>

                        <div className="ml-auto gap-1">
                            <NewCustomerDialog _onSubmit={addCustomer} />
                        </div>
                    </CardHeader>

                    <CardContent>
                        <DataTable
                            columns={customerColumns}
                            data={customers}
                            searchPlaceholder="Search customers..."
                            searchColumn="name"
                        />
                    </CardContent>
                </Card>
            </main>
        </ContentLayout>
    )
}

export default CustomersPage;
