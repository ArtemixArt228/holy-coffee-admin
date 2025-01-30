"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

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
        cell: ({ row, table }) => {
            const router = useRouter();
            const searchParams = useSearchParams();
            const isSelected = row.getIsSelected();

            const handleSelect = (value: boolean) => {
                // Get the current URL parameters
                const params = new URLSearchParams(searchParams.toString());

                // Clear existing selections
                table.toggleAllRowsSelected(false);

                if (value) {
                    // Add the selected row ID to the URL
                    params.set("selectedRow", row.original.id);
                } else {
                    // Remove the row ID from the URL if unselected
                    params.delete("selectedRow");
                }

                // Push the updated URL
                router.push(`?${params.toString()}`, { scroll: false });

                // Select or deselect the row
                row.toggleSelected(value);
            };

            return (
                <Checkbox
                    checked={isSelected}
                    onCheckedChange={handleSelect}
                    aria-label="Select row"
                    className="rounded-full" // Makes checkbox look like a radio button
                />
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Ім`я",
        cell: ({ row }) => (
            <FilterInput
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