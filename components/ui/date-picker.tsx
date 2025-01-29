"use client"

import * as React from "react"
import { format } from "date-fns"
import { uk } from "date-fns/locale" // Import Ukrainian locale
import { Calendar as CalendarIcon } from "lucide-react"
import {useRouter,useSearchParams} from "next/navigation";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const dateParam = searchParams.get('date')

    const [date, setDate] = React.useState<Date | undefined>(
        dateParam ? new Date(dateParam) : undefined
    )

    const handleSelect = (newDate: Date | undefined) => {
        setDate(newDate)
        const params = new URLSearchParams(searchParams.toString())

        if (newDate) {
            const formattedDate = format(newDate, 'yyyy-MM-dd') // Formats in local time
            params.set('date', formattedDate)
        } else {
            params.delete('date')
        }

        router.replace(`?${params.toString()}`)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                        format(date, "PPP", { locale: uk }) // Add Ukrainian locale here
                    ) : (
                        <span>Виберіть дату</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleSelect}
                    initialFocus
                    locale={uk} // Add Ukrainian locale for calendar
                    weekStartsOn={1} // Monday as first week day
                    toYear={new Date().getFullYear()}
                />
            </PopoverContent>
        </Popover>
    )
}