"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FilterInput } from "@/app/playground-slots/components/filter-input";
import { SelectableRowCheckbox } from "@/app/playground-slots/components/selectable-row-checkbox";
import { PaymentStatusSelect } from "@/app/playground-slots/components/payment-status-select";

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
        cell: ({ row, table }) => <SelectableRowCheckbox<Partial<Reservation>> row={row} table={table} />,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Ім`я",
        cell: ({ row }) => (
            <FilterInput
                columnName="name"
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
                columnName="surname"
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
                columnName="phone"
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
        cell: ({ row }) => (
            <PaymentStatusSelect
                columnName="payment_status"
                value={row.getValue("payment_status")}
                disabled={!row.getIsSelected()}
            />
        )
    },
];