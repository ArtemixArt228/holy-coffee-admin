"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

interface IFilterInputProps {
    column: string;
    disabled: boolean;
    value?: string;
}

export const FilterInput = ({ column, disabled, value }: IFilterInputProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentParams = new URLSearchParams(searchParams.toString());

    const [inputValue, setInputValue] = useState(value || "");

    useEffect(() => {
        // Only update URL when input is disabled (filter mode)
        if (!disabled) {
            const delayDebounce = setTimeout(() => {
                if (inputValue) {
                    currentParams.set(column, inputValue);
                } else {
                    currentParams.delete(column);
                }
                router.push(`?${currentParams.toString()}`, { scroll: false });
            }, 500);

            return () => clearTimeout(delayDebounce);
        }
    }, [disabled, inputValue]); // Add disabled to dependencies

    return (
        <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={disabled}
        />
    );
};