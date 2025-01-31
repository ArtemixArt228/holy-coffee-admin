"use client";

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable, RowData,
} from "@tanstack/react-table";
import {useSearchParams} from "next/navigation";

import {createClient} from "@/utils/supabase/client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Reservation} from "@/app/playground-slots/colums";
import {useLocalStorage} from "@/hooks/use-local-storage";
import {RESERVATION_KEY} from "@/app/constants/local-storage";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({columns, data,}: DataTableProps<TData, TValue>) {
    const searchParams = useSearchParams();

    const initialPage = Number(searchParams.get("page")) || 0;
    const selectedRow = Number(searchParams.get("selectedRow")) || 0;

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = React.useState<string>("");
    const [pagination, setPagination] = React.useState({
        pageIndex: initialPage,
        pageSize: 6, // Default page size
    });

    const {removeItem, getItem} = useLocalStorage(RESERVATION_KEY);

    React.useEffect(() => {
        const pageFromParams = Number(searchParams.get("page")) || 0;
        setPagination((prev) => ({
            ...prev,
            pageIndex: pageFromParams,  // Ensure pagination doesn't reset
        }));
    }, [searchParams]);

    async function addReservation(reservation: RowData)  {
        const supabase = createClient();

        const data = {...reservation, ...getItem(), user_id: 123456789};

        await supabase
            .from("reservations")
            .insert([data]);
    }

    async function updateReservation(id: string, updates: Partial<Reservation>) {
        const supabase = createClient();

        await supabase
            .from("reservations") // Table name
            .update(updates) // Fields to update
            .eq("id", id); // Find row by ID
    }

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: (row, _, filterValue) => {
            const searchTerm = filterValue.toLowerCase();
            return (
                (row.original as Reservation).name.toLowerCase().includes(searchTerm) ||
                (row.original as Reservation).surname.toLowerCase().includes(searchTerm) ||
                (row.original as Reservation).phone.toLowerCase().includes(searchTerm)
            );
        },
        state: {
            sorting,
            pagination,
            columnFilters,
            globalFilter,
        }
    });

    return (
        <div>
            {/* Filter Input */}
            <div className="mb-4">
                <Input
                    placeholder="Фільтер по іменам, прізвищу або телефону..."
                    value={globalFilter ?? ""}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="max-w-sm"
                />
            </div>
            {/* Table */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <Table className="w-full border-collapse">
                {/* Table Header */}
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="bg-gray-50">
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                {/* Table Body */}
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                className="hover:bg-gray-100 even:bg-gray-50"
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className="px-4 py-2 text-sm text-gray-600"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center text-sm text-gray-500"
                            >
                                Немає результатів ❌
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
            {/* Pagination */}
            <div className="flex justify-between mt-5">
                {/* Reservation Button */}
                <div className="flex justify-end">
                    <Button variant="secondary" size="sm" onClick={() => addReservation(table.getRow(String(selectedRow)).original)}>
                        Додати
                    </Button>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-end space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Попередня
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Наступна
                    </Button>
                </div>
            </div>

        </div>
    );
}
