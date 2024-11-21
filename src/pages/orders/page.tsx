import { batchDeleteOrder, deleteOrder } from "@/actions/order/delete-order"
import { fetchOrders } from "@/actions/order/fetch-orders"
import { ContentLayout } from "@/components/admin-panel/layout/content-layout"
import { orderColumns } from "@/components/admin-panel/orders/data-table/columns/order-columns"
import NewOrderDialog from "@/components/admin-panel/orders/dialog/new-order-dialog"
import { DataTable } from "@/components/data-table/data-table"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { RefreshCwIcon } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { Order } from "shared/types/order"

const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

    const { toast } = useToast();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const fetchedOrders = await fetchOrders();

        if (fetchedOrders.error) {
            toast({
                title: "Error",
                description: fetchedOrders.error.message
            })
        } else {
            setOrders(fetchedOrders?.success?.data);
        }
    };


    const onDelete = useCallback(async (order: Order) => {
        const response = await deleteOrder(order.id!);

        if (response.error) {
            toast({
                title: "Error",
                description: response.error.message
            })
        } else {
            toast({
                title: "Error",
                description: response?.success?.message
            });
        }
    }, [])

    const onBatchDelete = useCallback(async (orders: Order[]) => {
        const response = await batchDeleteOrder(orders.map(o => o.id!));

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

    const onEdit = useCallback((order: Order) => {
        setSelectedOrder(order);
        setIsDialogOpen(true);
    }, []);


    return (
        <ContentLayout title="Orders">
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
                                Orders
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
                                Orders
                            </CardTitle>
                            <CardDescription>
                                A detailed overview of all orders.
                            </CardDescription>
                        </div>

                        <div className="flex items-center ml-auto gap-2">
                            <Button
                                variant="ghost"
                                className="relative h-10 w-10"
                            >
                                <RefreshCwIcon className="w-4 h-4" />
                            </Button>

                            <NewOrderDialog
                                isOpen={isDialogOpen}
                                onOpenChange={(value: boolean) => {
                                    setIsDialogOpen(value);
                                    if (!value) {
                                        setSelectedOrder(null);
                                    }
                                }}
                                order={selectedOrder}
                            />
                        </div>
                    </CardHeader>

                    <CardContent>
                        <DataTable
                            columns={orderColumns({ onEdit, onDelete })}
                            data={orders}
                            searchPlaceholder="Search orders..."
                            searchColumn="name"
                            onDelete={onBatchDelete}
                        />
                    </CardContent>
                </Card>
            </main>
        </ContentLayout>
    )
}

export default OrdersPage;