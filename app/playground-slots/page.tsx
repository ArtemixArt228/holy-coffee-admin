import { createClient } from "@/utils/supabase/server";

import { columns, Reservation } from "@/app/playground-slots/colums";

import { DataTable } from "@/components/ui/data-table";
import {DatePicker} from "@/components/ui/date-picker";
import {format} from "date-fns";

async function getData(date?: string): Promise<Reservation[]> {
    const supabase = await createClient();

    // Fetch reservations for today
    const { data: reservations } = await supabase
        .from("reservations")
        .select()
        .eq("date", date); // Assuming your table has a `date` column

    return reservations ?? [];
}

function generateTimeSlots(): string[] {
    const slots: string[] = [];
    for (let hour = 10; hour <= 21; hour++) {
        slots.push(`${hour}:00`);
    }
    return slots;
}

function mergeSlotsWithReservations(
    date: string,
    slots: string[],
    reservations: Reservation[]
): Partial<Reservation>[] {
    return slots.map((slot) => {
        const reservation = reservations.find((res) => res.slot === slot);
        return reservation || { slot, name: '', surname: '', phone: '', payment_status: '', date };
    });
}

export default async function PlaygroundSlots({searchParams,}: {
    searchParams: { date?: string }
}) {
    const { date } = await searchParams;
    const selectedDate = date || format(new Date(), 'yyyy-MM-dd')

    const reservations = await getData(selectedDate);
    const slots = generateTimeSlots();
    const data = mergeSlotsWithReservations(selectedDate, slots, reservations);

    return (
        <div className="container mx-auto py-10 relative">
            <div className="absolute right-0">
                <DatePicker/>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
}