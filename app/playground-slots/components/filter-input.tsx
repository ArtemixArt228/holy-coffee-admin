'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

export const FilterInput = ({ column, value }: { column: string; value?: string }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentParams = new URLSearchParams(searchParams.toString());

    const [inputValue, setInputValue] = useState(value || ""); // Local state to prevent immediate re-renders

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (inputValue) {
                currentParams.set(column, inputValue);
            } else {
                currentParams.delete(column);
            }
            router.push(`?${currentParams.toString()}`, { scroll: false });
        }, 500); // Debounce input updates to prevent excessive URL updates

        return () => clearTimeout(delayDebounce); // Cleanup on unmount or input change
    }, [inputValue]);

    return <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />;
};
