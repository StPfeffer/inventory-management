import { fetchCustomer } from "@/actions/customer/fetch-customers";
import { fetchOrder } from "@/actions/order/fetch-orders";
import { batchDeleteOrderItem, deleteOrderItem } from "@/actions/order/order-item/delete-order-item";
import { fetchOrderItem } from "@/actions/order/order-item/fetch-order-items";
import { ContentLayout } from "@/components/admin-panel/layout/content-layout";
import { orderItemColumns } from "@/components/admin-panel/orders/order-items/data-table/columns/order-item-columns";
import NewOrderItemDialog from "@/components/admin-panel/orders/order-items/dialog/new-order-item-dialog";
import { DataTable } from "@/components/data-table/data-table";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Customer } from "@/types/customer";
import { RefreshCwIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Order, OrderItem } from "shared/types/order";

const OrderDetailsPage = () => {
    const { orderId } = useParams();

    const [order, setOrder] = useState<Order>();
    const [customer, setCustomer] = useState<Customer>();
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [selectedOrderItem, setSelectedOrderItem] = useState<OrderItem | null>(null)

    const { toast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedOrder = await fetchOrder(orderId!);

            if (fetchedOrder.error) {
                toast({
                    title: "Error",
                    description: fetchedOrder.error.message,
                });
            } else {
                const orderData = fetchedOrder?.success?.data;
                setOrder(orderData);

                if (orderData?.customerId) {
                    const fetchedCustomer = await fetchCustomer(orderData.customerId);

                    if (fetchedCustomer.error) {
                        toast({
                            title: "Error",
                            description: fetchedCustomer.error.message,
                        });
                    } else {
                        setCustomer(fetchedCustomer.success?.data);
                    }
                }

                if (orderData?.customerId) {
                    const fetchedItems = await fetchOrderItem(orderData.customerId);

                    if (fetchedItems.error) {
                        toast({
                            title: "Error",
                            description: fetchedItems.error.message,
                        });
                    } else {
                        setOrderItems(fetchedItems.success?.data);
                    }
                }
            }
        };

        fetchData();
    }, []);

    const onDelete = useCallback(async (order: OrderItem) => {
        const response = await deleteOrderItem(order.id!);

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

    const onBatchDeleteItems = useCallback(async (orders: OrderItem[]) => {
        const response = await batchDeleteOrderItem(orders.map(o => o.id!));

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

    const onEdit = useCallback((orderItem: OrderItem) => {
        setSelectedOrderItem(orderItem);
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
                            <BreadcrumbLink asChild>
                                <a href="/orders">
                                    Orders
                                </a>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                {order?.id}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Tabs defaultValue="overview">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="order-items">Order Items</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <Card
                            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                        >
                            <CardHeader className="flex flex-row items-center">
                                <div className="w-full grid gap-2 justify-between">
                                    <CardTitle>
                                        Order {order?.id}
                                    </CardTitle>
                                </div>
                            </CardHeader>

                            <CardContent className="flex-col ">
                                <div className="my-4">
                                    <p className="font-semibold">Order id</p>
                                    <p>
                                        511518619851
                                        {order?.id}
                                    </p>
                                </div>

                                <div className="my-4">
                                    <p className="font-semibold">Date</p>
                                    <p>
                                        {order?.date === null ? "Null" : order?.date.toLocaleDateString() || "Null"}
                                    </p>
                                </div>

                                <div className="my-4">
                                    <p className="font-semibold">Status</p>
                                    <p>
                                        Cancelled
                                        {order?.status}
                                    </p>
                                </div>

                                <div className="my-4">
                                    <p className="font-semibold">Customer</p>
                                    <p>
                                        Rodolfo
                                        {customer?.name}
                                    </p>
                                </div>

                                <div className="my-4">
                                    <p className="font-semibold">Total</p>
                                    <p>
                                        R$ 24,52
                                        {order?.total}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="order-items">
                        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
                            <CardHeader className="flex flex-row items-center">
                                <div className="grid gap-2">
                                    <CardTitle>
                                        Orders items
                                    </CardTitle>
                                </div>

                                <div className="flex items-center ml-auto gap-2">
                                    <Button
                                        variant="ghost"
                                        className="relative h-10 w-10"
                                    >
                                        <RefreshCwIcon className="w-4 h-4" />
                                    </Button>

                                    <NewOrderItemDialog
                                        isOpen={isDialogOpen}
                                        onOpenChange={(value: boolean) => {
                                            setIsDialogOpen(value);
                                            if (!value) {
                                                setSelectedOrderItem(null);
                                            }
                                        }}
                                        orderItem={selectedOrderItem}
                                    />
                                </div>
                            </CardHeader>


                            <CardContent>   
                                <DataTable
                                    columns={orderItemColumns({ onEdit, onDelete})}
                                    data={orderItems}
                                    searchPlaceholder="Search order items..."
                                    searchColumn="name"
                                    onDelete={onBatchDeleteItems}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </ContentLayout>
    )
}

export default OrderDetailsPage;
