import { ModeToggle } from "@/components/mode-toggle.tsx";
import { SheetMenu } from "../sidebar/sheet-menu";
import { UserNav } from "./user-nav";

interface NavbarProps {
    title: string;
}

export default function AdminNavbar({ title }: NavbarProps) {
    return (
        <header className="flex h-20 shrink-0 items-center px-4 md:px-6 top-0 z-10 w-full bg-background/95 backdrop-blur shadow supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
            <div className="flex items-center space-x-4 lg:space-x-0">
                <SheetMenu />

                <h1 className="font-bold">
                    {title}
                </h1>
            </div>

            <div className="ml-auto flex items-center">
                <ModeToggle className="mr-2 rounded-full w-10 h-10 bg-background" />

                <UserNav />
            </div>
        </header>
    )
}
