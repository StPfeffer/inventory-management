import { useCallback, useState } from "react"
import { CustomerColumns } from "@/components/customer/table/customer-columns"
import { DataTable } from "@/components/data-table/data-table"

import { Customer } from "@/types/customer"
import { ContentLayout } from "@/components/admin-panel/layout/content-layout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NewCustomerForm } from '@/components/admin-panel/form/customer/new-customer-form'

export default function CustomerPage() {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
    
    const [customer] = useState<Customer[]>([
        {
            id: 8556,
            name: "Customer 1",
            contact: "45999999",
            address: "St. White Duck",
            document: "111.111.111-11"
        },
        {
            id: 85546,
            name: "Customer 2",
            contact: "4599988999",
            address: "St. Black Duck",
            document: "222.222.222-22"
        }])


    const onDelete = useCallback((customer: Customer) => alert(`On delete customer ${customer.id}`), [])

    const onEdit = useCallback(
        (customer: Customer) => {
            setSelectedCustomer(customer);
            setIsDialogOpen(true);
        },
        []
    )

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
                            <BreadcrumbPage>Customer</BreadcrumbPage>
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
                                A overview of all customers.
                            </CardDescription>
                        </div>

                        <div className="ml-auto gap-1">
                            <NewCustomerForm 
                                isOpen={isDialogOpen} 
                                onOpenChange={(value: boolean) => {
                                    setIsDialogOpen(value);
                                    if (!value) {
                                        setSelectedCustomer(null)
                                    }}} 
                                customer={selectedCustomer}></NewCustomerForm>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <DataTable columns={CustomerColumns({onEdit,onDelete})} data={customer} />
                    </CardContent>
                </Card>
            </main>
        </ContentLayout>

    )


}