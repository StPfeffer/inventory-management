import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import { Row } from "@tanstack/react-table";
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
import { useLocation, useNavigate } from "react-router-dom";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
    acessorKey: string;
    onEdit?: (value: TData) => void;
    onDelete?: (value: TData) => void;
}

export function DataTableRowActions<TData>({
    row,
    acessorKey,
    onEdit,
    onDelete
}: DataTableRowActionsProps<TData>) {
    const handleDeleteClick = () => {
        onDelete!(row.original);
    };

    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname + "/" + row.getValue(acessorKey);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <Ellipsis className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate(path)}>
                    View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit ? onEdit!(row.original) : {}}>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(row.getValue(acessorKey))}
                >
                    Copy
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                    <Dialog>
                        <DialogTrigger className="w-full flex">
                            <div>
                                Delete
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you sure?</DialogTitle>
                                <DialogDescription>
                                    Do you want to delete the entry? Deleting this entry cannot be
                                    undone.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button onClick={() => handleDeleteClick()}>
                                        Delete
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}