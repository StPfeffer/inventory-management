
import { useState } from "react"
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

export default function CustomerPage () {
    const [ customer, setCustomer ] = useState<Customer[]>([
        {
            id: 8556,
            name: "Customer 1",
            contact: "45999999",
            address: "St. White Duck",
        },
        {
            id: 85546,
            name: "Customer 2",
            contact: "4599988999",
            address: "St. Black Duck",
        }])

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
                <h1 className="text-3xl bold">Customers</h1>
                <DataTable columns={CustomerColumns} data={customer} />
            </main>
        </ContentLayout>

    )


}