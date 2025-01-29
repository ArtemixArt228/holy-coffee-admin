"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FilterInput } from "./components/filter-input";

export type Reservation = {
    id: string;
    date: string;
    slot: string;
    user_id: number;
    username: string;
    name: string;
    surname: string;
    phone: string;
    created_at: Date;
    payment_status: string;
    payment_method: string;
    payment_id: string;
};

export const columns: ColumnDef<Partial<Reservation>>[] = [
    {
        accessorKey: "name",
        header: "Ім`я",
        cell: ({ row }) => <FilterInput column="name" value={row.getValue("name")} />,
    },
    {
        accessorKey: "surname",
        header: "Прізвище",
        cell: ({ row }) => <FilterInput column="surname" value={row.getValue("surname")} />,
    },
    {
        accessorKey: "phone",
        header: "Телефон",
        cell: ({ row }) => <FilterInput column="phone" value={row.getValue("phone")} />,
    },
    {
        accessorKey: "date",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Дата <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "slot",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Час <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "payment_status",
        header: "Статус",
    },
];