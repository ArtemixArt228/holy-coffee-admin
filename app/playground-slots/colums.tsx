"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FilterInput } from "./components/filter-input";
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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
        id: "select",
        header: () => <Edit className="h-4 w-4" />,
        cell: ({ row, table }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => {
                    // Deselect all rows when selecting a new one
                    table.toggleAllRowsSelected(false);
                    row.toggleSelected(!!value);
                }}
                aria-label="Select row"
                className="rounded-full" // Makes checkbox look like radio
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Ім`я",
        cell: ({ row }) => (
            <FilterInput
                column="name"
                value={row.getValue("name")}
                disabled={!row.getIsSelected()}
            />
        ),
    },
    {
        accessorKey: "surname",
        header: "Прізвище",
        cell: ({ row }) => (
            <FilterInput
                column="surname"
                value={row.getValue("surname")}
                disabled={!row.getIsSelected()}
            />
        ),
    },
    {
        accessorKey: "phone",
        header: "Телефон",
        cell: ({ row }) => (
            <FilterInput
                column="phone"
                value={row.getValue("phone")}
                disabled={!row.getIsSelected()}
            />
        ),
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
        cell: ({ row }) => {
            const status = row.getValue("payment_status") as string || "pending";

            return (
                <Select
                    defaultValue={status}
                    disabled={!row.getIsSelected()}
                >
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Статус оплати" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="paid">Сплачено 💲</SelectItem>
                        <SelectItem value="pending">В процесі 👀</SelectItem>
                    </SelectContent>
                </Select>
            );
        }
    },
];