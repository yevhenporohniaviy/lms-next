import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Payment, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { redirect } from "next/navigation";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}
 

const CoursesPage = async () => {
  const { userId } = auth();
  
  if (!userId) {
    return redirect('/')
  }
  const data = await db.course.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  
  return (
    <div className="p-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
 
export default CoursesPage;