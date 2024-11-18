import { fetchUser } from "@/actions/users/fetch-users";
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
import { User } from "shared/types/user";

const UserDetailsPage = () => {
    const { userId } = useParams();

    const [user, setUser] = useState<User>();

    const { toast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedUser = await fetchUser(userId!);

            if (fetchedUser.error) {
                toast({
                    title: "Error",
                    description: fetchedUser.error.message
                })
            } else {
                setUser(fetchedUser?.success?.data);
            }
        };

        fetchData();
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
                            <BreadcrumbLink asChild>
                                <a href="/users">
                                    Users
                                </a>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                {user?.name}
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
                                        {user?.name}
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
                                <p>{user?.name}</p>
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

export default UserDetailsPage;
