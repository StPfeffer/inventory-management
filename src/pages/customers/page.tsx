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
import { useCallback, useEffect, useState } from "react";
import { fetchCustomers } from "@/actions/customer/fetch-customers";
import { useToast } from "@/hooks/use-toast";
import { customerColumns } from "@/components/admin-panel/customers/data-table/columns/customer-columns";
import NewCustomerDialog from "@/components/admin-panel/customers/dialog/new-customer-dialog";
import { batchDeleteCustomer, deleteCustomer } from "@/actions/customer/delete-customer";

const CustomersPage = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

    const { toast } = useToast();

    useEffect(() => {
        fetchData();
    }, []);

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

    const onDelete = useCallback(async (customer: Customer) => {
        const response = await deleteCustomer(customer.id!);

        if (response.error) {
            toast({
                title: "Error",
                description: response.error.message
            });
        } else {
            toast({
                title: "Success",
                description: response?.success?.message
            });
        }
    }, []);

    const onBatchDelete = useCallback(async (customers: Customer[]) => {
        const response = await batchDeleteCustomer(customers.map(c => c.id!));

        if (response.error) {
            toast({
                title: "Error",
                description: response.error.message
            });
        } else {
            toast({
                title: "Success",
                description: response?.success?.message
            });
        }
    }, []);

    const onEdit = useCallback((customer: Customer) => {
        setSelectedCustomer(customer);
        setIsDialogOpen(true);
    }, []);

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
                            <NewCustomerDialog
                                isOpen={isDialogOpen}
                                onOpenChange={(value: boolean) => {
                                    setIsDialogOpen(value);
                                    if (!value) {
                                        setSelectedCustomer(null);
                                    }
                                }}
                                customer={selectedCustomer}
                            />
                        </div>
                    </CardHeader>

                    <CardContent>
                        <DataTable
                            columns={customerColumns({ onEdit, onDelete })}
                            data={customers}
                            searchPlaceholder="Search customers..."
                            searchColumn="name"
                            onDelete={onBatchDelete}
                        />
                    </CardContent>
                </Card>
            </main>
        </ContentLayout>
    )
}

export default CustomersPage;
