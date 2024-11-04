import { fetchSupplier } from "@/actions/supplier/fetch-supplier";
import { ContentLayout } from "@/components/admin-panel/layout/content-layout";
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
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Supplier } from "shared/types/supplier";

const SupplierDetailsPage = () => {
    const { supplierId } = useParams();

    const [supplier, setSupplier] = useState<Supplier>();

    const { toast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedSupplier = await fetchSupplier(supplierId!);

            if (fetchedSupplier.error) {
                toast({
                    title: "Error",
                    description: fetchedSupplier.error.message
                })
            } else {
                setSupplier(fetchedSupplier?.success?.data);
            }
        };

        fetchData();
    }, []);

    return (
        <ContentLayout title="Suppliers">
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
                            <BreadcrumbLink asChild>
                                <a href="/inventory/suppliers">
                                    Suppliers
                                </a>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                {supplier?.name}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Tabs defaultValue="overview">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="order-history">Order History</TabsTrigger>
                        <TabsTrigger value="activity">Activity</TabsTrigger>
                        <TabsTrigger value="other">Other</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <Card
                            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                        >
                            <CardHeader className="flex flex-row items-center">
                                <div className="w-full grid gap-2 justify-between">
                                    <CardTitle>
                                        {supplier?.name}
                                    </CardTitle>
                                </div>

                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="All time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="all">All time</SelectItem>
                                            <SelectItem value="week">This week</SelectItem>
                                            <SelectItem value="month">This month</SelectItem>
                                            <SelectItem value="year">This year</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </CardHeader>

                            <CardContent>
                                <p>{supplier?.name}</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="order-history">
                        <Card
                            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                        >
                            <CardHeader className="flex flex-row items-center">
                                <div className="grid gap-2">
                                    <CardTitle>
                                        Nothing there yet
                                    </CardTitle>
                                </div>
                            </CardHeader>

                            <CardContent>
                                Empty
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="activity">
                        <Card
                            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                        >
                            <CardHeader className="flex flex-row items-center">
                                <div className="grid gap-2">
                                    <CardTitle>
                                        Nothing there yet
                                    </CardTitle>
                                </div>
                            </CardHeader>

                            <CardContent>
                                Empty
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="other">
                        <Card
                            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                        >
                            <CardHeader className="flex flex-row items-center">
                                <div className="grid gap-2">
                                    <CardTitle>
                                        Nothing there yet
                                    </CardTitle>
                                </div>
                            </CardHeader>

                            <CardContent>
                                Empty
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </ContentLayout>
    )
}

export default SupplierDetailsPage;
