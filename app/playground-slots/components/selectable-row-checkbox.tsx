import { useRouter, useSearchParams } from "next/navigation";
import { Row, Table } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

interface SelectableRowCheckboxProps<TData extends { id?: string }> {
    row: Row<TData>;
    table: Table<TData>;
}

export const SelectableRowCheckbox = <TData extends { id?: string },>({ row, table }: SelectableRowCheckboxProps<TData>) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isSelected = row.getIsSelected();

    const handleSelect = (value: boolean) => {
        const params = new URLSearchParams(searchParams?.toString() || "");

        table.toggleAllRowsSelected(false);

        if (value) {
            params.set("selectedRow", String(row.id));
        } else {
            params.delete("selectedRow");
        }

        // Preserve the current page from state
        const currentPage = searchParams.get("page") || String(table.getState().pagination.pageIndex);
        params.set("page", currentPage);

        router.replace(`?${params.toString()}`, { scroll: false });
        row.toggleSelected(value);
    };



    return (
        <Checkbox
            checked={isSelected}
            onCheckedChange={handleSelect}
            aria-label="Select row"
            className="rounded-full"
        />
    );
};