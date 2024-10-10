"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { DataTableViewOptions } from "./data-table-view-options";
import { types, categories, paymentMethods, cardBrands } from "@/db/dummy/data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter transactions..."
          value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("description")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[245px] lg:w-[350px]"
        />
        <div className="hidden sm:flex space-x-1">
          {table.getAllColumns().find(x => x.id === "category") && (
            <DataTableFacetedFilter
              column={table.getColumn("category")}
              title="Category"
              options={categories}
            />
          )}
          {table.getAllColumns().find(x => x.id === "type") && (
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
          )}
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
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}