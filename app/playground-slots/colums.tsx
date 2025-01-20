"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import {Button} from "@/components/ui/button";

export type Reservation = {
    id: string
    date: string
    slot: string
    user_id: number
    username: string
    name: string
    surname: string
    phone: string
    created_at: Date
    payment_status: string
    payment_method: string
    payment_id: string
    
}

export const columns: ColumnDef<Partial<Reservation>>[] = [
    {
        accessorKey: "name",
        header: "Ім`я",
        filterFn: "arrIncludesSome",
    },
    {
        accessorKey: "surname",
        header: "Прізвище",
        filterFn: "arrIncludesSome",
    },
    {
        accessorKey: "phone",
        header: "Телефон",
        filterFn: "arrIncludesSome",
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Дата <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "slot",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Час <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "payment_status",
        header: "Статус",
    },
]
