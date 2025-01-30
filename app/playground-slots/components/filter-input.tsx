"use client"

import { useState } from "react";

import { Input } from "@/components/ui/input";

interface IFilterInputProps {
    disabled: boolean;
    value?: string;
}

export const FilterInput = ({ disabled, value }: IFilterInputProps) => {
    const [inputValue, setInputValue] = useState(value || "");

    return (
        <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={disabled}
        />
    );
};