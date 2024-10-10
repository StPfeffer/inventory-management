
import { useState } from "react"
import { CostumerColumns } from "@/components/costumer/table/costumer-columns"
import { DataTable } from "@/components/data-table/data-table"

import { Costumer } from "@/types/costumer"


export default function CostumerPage () {
    const [ costumer, setCostumer ] = useState<Costumer[]>([
        {
            id: 8556,
            name: "Costumer 1",
            contact: "45999999",
            address: "St. White Duck",
        },
        {
            id: 85546,
            name: "Costumer 2",
            contact: "4599988999",
            address: "St. Black Duck",
        }])

    return (
        <>
            <div className="container mx-auto py-10">
                <DataTable columns={CostumerColumns} data={costumer} />
            </div>
        
        </>

    )


}