import { columns, Reservation } from "@/app/playground-slots/colums";
import { DataTable } from "@/components/ui/data-table";

import { createClient } from "@/utils/supabase/server";

async function getData(): Promise<Reservation[]> {
  const supabase = await createClient();

  const { data: reservations } = await supabase.from("reservations").select();

  return reservations ?? [];
}

export default async function PlaygroundSlots() {
  const data = await getData();

  return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
  );
}
