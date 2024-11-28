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
import {
    useCallback,
    useEffect,
    useState
} from "react";
import { useToast } from "@/hooks/use-toast";
import { Supplier } from "shared/types/supplier";
import { fetchSuppliers } from "@/actions/supplier/fetch-supplier";
import NewSupplierDialog from "@/components/admin-panel/suppliers/dialog/new-supplier-dialog";
import { supplierColumns } from "@/components/admin-panel/suppliers/data-table/columns/supplier-columns";
import RefreshButton from "@/components/ui/refresh-button";
import { useAuth } from "@/components/auth/auth-context-provider";
import { batchDeleteSupplier, deleteSupplier } from "@/actions/supplier/delete-supplier";

const SuppliersPage = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
    const { hasPermission } = useAuth();

    const { toast } = useToast();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const fetchedSuppliers = await fetchSuppliers();

        if (fetchedSuppliers.error) {
            toast({
                title: "Error",
                description: fetchedSuppliers.error.message
            })
        } else {
            setSuppliers(fetchedSuppliers?.success?.data);
        }
    };

    const onDelete = useCallback(async (supplier: Supplier) => {
        const response = await deleteSupplier(supplier.id!);

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

    const onBatchDelete = useCallback(async (suppliers: Supplier[]) => {
        const response = await batchDeleteSupplier(suppliers.map(c => c.id!));

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

    const onEdit = useCallback((supplier: Supplier) => {
        setSelectedSupplier(supplier);
        setIsDialogOpen(true);
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
                                <a href="/inventory">
                                    Inventory
                                </a>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                Suppliers
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
                                Suppliers
                            </CardTitle>
                            <CardDescription>
                                A detailed overview of all suppliers.
                            </CardDescription>
                        </div>

                        <div className="flex items-center ml-auto gap-2">
                            <RefreshButton onClick={fetchData} />

                            {hasPermission("admin") &&
                                <NewSupplierDialog 
                                    isOpen={isDialogOpen}
                                        onOpenChange={(value: boolean) => {
                                            setIsDialogOpen(value);
                                            if (!value) {
                                                setSelectedSupplier(null);
                                            }
                                        }}
                                        supplier={selectedSupplier}
                                />
                            }
                        </div>
                    </CardHeader>

                    <CardContent>
                        <DataTable
                            columns={supplierColumns({ onEdit, onDelete })}
                            data={suppliers}
                            searchPlaceholder="Search suppliers..."
                            searchColumn="name"
                            onDelete={onBatchDelete}
                        />
                    </CardContent>
                </Card>
            </main>
        </ContentLayout>
    )
}

export default SuppliersPage;
