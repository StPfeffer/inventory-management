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
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Product } from "shared/types/product";
import {
    useEffect,
    useState
} from "react";
import NewProductDialog from "@/components/admin-panel/products/dialog/new-product-dialog";
import { productsColumns } from "@/components/admin-panel/products/data-table/columns/product-columns";
import { fetchProducts } from "@/actions/products/fetch-products";
import { useToast } from "@/hooks/use-toast";
import { ProductsDataTable } from "@/components/admin-panel/products/data-table/products-data-table";
import RefreshButton from "@/components/ui/refresh-button";
import { useAuth } from "@/components/auth/auth-context-provider";

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { hasPermission } = useAuth();

    const { toast } = useToast();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const fetchedProducts = await fetchProducts();

        if (fetchedProducts.error) {
            toast({
                title: "Error",
                description: fetchedProducts.error.message
            })
        } else {
            setProducts(fetchedProducts?.success?.data);
        }
    };

    return (
        <ContentLayout title="Products">
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
                                Products
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
                                Products
                            </CardTitle>
                            <CardDescription>
                                A detailed overview of all products.
                            </CardDescription>
                        </div>

                        <div className="flex items-center ml-auto gap-2">
                            <RefreshButton onClick={fetchData} />

                            {hasPermission("admin") &&
                                <NewProductDialog />
                            }
                        </div>
                    </CardHeader>

                    <CardContent>
                        <ProductsDataTable
                            columns={productsColumns}
                            data={products}
                            searchPlaceholder="Search products..."
                            searchColumn="name"
                        />
                    </CardContent>
                </Card>
            </main>
        </ContentLayout>
    )
}

export default ProductsPage;
