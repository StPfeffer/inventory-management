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
import { Product } from "@/types/product";
import { useState } from "react";
import NewProductDialog from "@/components/admin-panel/products/dialog/new-product-dialog";
import { productsColumns } from "@/components/admin-panel/products/data-table/columns/product-columns";
import { fetchProducts } from "@/actions/products/fetch-products";

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>(() => {
        return fetchProducts();
    });

    const addProduct = (newProduct: Product) => {
        const updatedTransactions = [...products, newProduct];
        setProducts(updatedTransactions);
        localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
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

                        <div className="ml-auto gap-1">
                            <NewProductDialog _onSubmit={addProduct} />
                        </div>
                    </CardHeader>

                    <CardContent>
                        <DataTable columns={productsColumns} data={products} searchPlaceholder="Search products..." />
                    </CardContent>
                </Card>
            </main>
        </ContentLayout>
    )
}

export default ProductsPage;
