"use client"

import {useEffect, useState} from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {useLocalStorage} from "@/hooks/use-local-storage";

import {RESERVATION_KEY} from "@/app/constants/local-storage";

interface IPaymentStatusSelectProps {
    columnName: string;
    disabled: boolean;
    value?: string;
}

export const PaymentStatusSelect= ({ columnName, disabled, value }: IPaymentStatusSelectProps) => {
    const [selectValue, setSelectValue] = useState(value || "");

    const {setItem, getItem} = useLocalStorage(RESERVATION_KEY);

    useEffect(() => {
        setItem({...getItem(), [`${columnName}`]: selectValue});
    }, [columnName, getItem, selectValue, setItem]);

    return (
        <Select value={selectValue} onValueChange={(status) => setSelectValue(status)} disabled={disabled}>
            <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Статус оплати" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="paid">Сплачено 💲</SelectItem>
                <SelectItem value="pending">В процесі 👀</SelectItem>
            </SelectContent>
        </Select>
    );
};