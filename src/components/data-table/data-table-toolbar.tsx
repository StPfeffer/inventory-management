import { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    searchable?: boolean;
    searchPlaceholder?: string;
    searchColumn?: string;
    onDelete?: (values: TData[]) => void;
}

export function DataTableToolbar<TData>({
    table,
    searchable = true,
    searchPlaceholder = "Search...",
    searchColumn,
    onDelete
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {searchable && searchColumn &&
                    <Input
                        placeholder={searchPlaceholder}
                        value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn(searchColumn)?.setFilterValue(event.target.value)
                        }
                        className="h-8 w-[245px] lg:w-[350px]"
                    />
                }
                {/* {table.getAllColumns().find(x => x.id === "type") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("type")}
                            title="Type"
                            options={types}
                        />
                    )}
                    {table.getAllColumns().find(x => x.id === "paymentMethod") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("paymentMethod")}
                            title="Method"
                            options={paymentMethods}
                        />
                    )}
                    {table.getAllColumns().find(x => x.id === "cardBrand") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("cardBrand")}
                            title="Card Brand"
                            options={cardBrands}
                        />
                    )} */}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>

            <DataTableViewOptions table={table} onDelete={onDelete} />
        </div>
    )
}