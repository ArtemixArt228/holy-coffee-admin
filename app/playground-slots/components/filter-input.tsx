"use client"

import {useEffect, useState} from "react";

import { Input } from "@/components/ui/input";

import {useLocalStorage} from "@/hooks/use-local-storage";
import {RESERVATION_KEY} from "@/app/constants/local-storage";

interface IFilterInputProps {
    columnName: string;
    disabled: boolean;
    value?: string;
}

export const FilterInput = ({ columnName, disabled, value }: IFilterInputProps) => {
    const [inputValue, setInputValue] = useState(value || "");

    const {setItem, getItem} = useLocalStorage(RESERVATION_KEY);

    useEffect(() => {
        setItem({...getItem(), [`${columnName}`]: inputValue});
    }, [columnName, getItem, inputValue, setItem]);

    return (
        <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={disabled}
        />
    );
};