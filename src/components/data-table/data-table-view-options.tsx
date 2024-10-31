import {
    Row,
    Table
} from "@tanstack/react-table";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../ui/dialog";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
    Settings2,
    Trash2
} from "lucide-react";

interface DataTableViewOptionsProps<TData> {
    table: Table<TData>;
    onDelete?: (values: TData[]) => void;
}

export function DataTableViewOptions<TData>({
    table,
    onDelete
}: DataTableViewOptionsProps<TData>) {
    const selectedRows: Row<TData>[] = table.getSelectedRowModel().rows;

    const handleDeleteClick = () => {
        onDelete!(selectedRows.map(row => row.original));
    };

    return (
        <div className="flex items-center gap-2">
            {selectedRows.length > 0 && onDelete &&
                <Dialog>
                    <DialogTrigger>
                        <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                            Delete
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you sure?</DialogTitle>

                            <DialogDescription>
                                Do you want to delete all the selected entries?
                                This cannot be undone.
                            </DialogDescription>
                        </DialogHeader>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>

                            <DialogClose asChild>
                                <Button onClick={handleDeleteClick}>
                                    Delete
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            }

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto hidden h-8 lg:flex"
                    >
                        <Settings2 className="mr-2 h-4 w-4" />
                        View
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-[150px]">
                    <DropdownMenuLabel>
                        Toggle columns
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    {table
                        .getAllColumns()
                        .filter(
                            (column) =>
                                typeof column.accessorFn !== "undefined" && column.getCanHide()
                        )
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                >
                                    {column.columnDef.meta?.label}
                                </DropdownMenuCheckboxItem>
                            )
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}