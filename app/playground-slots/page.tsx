import {columns, Payment} from "@/app/playground-slots/colums";
import {DataTable} from "@/components/ui/data-table";


async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ]
}

export default async function PlaygroundSlots() {
  const data = await getData()

  return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
  )
}
