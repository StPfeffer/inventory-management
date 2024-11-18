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
import { User } from "shared/types/user";
import { useCallback, useEffect, useState } from "react";
import { fetchUsers } from "@/actions/users/fetch-users";
import { useToast } from "@/hooks/use-toast";
import { userColumns } from "@/components/admin-panel/users/data-table/columns/user-columns";
import NewUserDialog from "@/components/admin-panel/users/dialog/new-user-dialog";
import {
    batchDeleteUser,
    deleteUser
} from "@/actions/users/delete-user";
import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";

const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const { toast } = useToast();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const fetchedUsers = await fetchUsers();

        if (fetchedUsers.error) {
            toast({
                title: "Error",
                description: fetchedUsers.error.message
            })
        } else {
            setUsers(fetchedUsers?.success?.data);
        }
    };

    const onDelete = useCallback(async (user: User) => {
        const response = await deleteUser(user.id!);

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

    const onBatchDelete = useCallback(async (users: User[]) => {
        const response = await batchDeleteUser(users.map(c => c.id!));

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

    const onEdit = useCallback((user: User) => {
        setSelectedUser(user);
        setIsDialogOpen(true);
    }, []);

    return (
        <ContentLayout title="Users">
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
                                Users
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
                                Users
                            </CardTitle>
                            <CardDescription>
                                A detailed overview of all users.
                            </CardDescription>
                        </div>

                        <div className="flex items-center ml-auto gap-2">
                            <Button
                                variant="ghost"
                                className="relative h-10 w-10"
                            >
                                <RefreshCwIcon className="w-4 h-4" />
                            </Button>

                            <NewUserDialog
                                isOpen={isDialogOpen}
                                onOpenChange={(value: boolean) => {
                                    setIsDialogOpen(value);
                                    if (!value) {
                                        setSelectedUser(null);
                                    }
                                }}
                                user={selectedUser}
                            />
                        </div>
                    </CardHeader>

                    <CardContent>
                        <DataTable
                            columns={userColumns({ onEdit, onDelete })}
                            data={users}
                            searchPlaceholder="Search users..."
                            searchColumn="name"
                            onDelete={onBatchDelete}
                        />
                    </CardContent>
                </Card>
            </main>
        </ContentLayout>
    )
}

export default UsersPage;
