import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const CoursesPage = async () => {
  const { userId } = auth();
  const courses = await db.course.findMany({
    where: {
      userId: userId,
    }
  });
  
  return (
    <div>
      <Link href="/teacher/create">
        <Button>New course</Button>
      </Link>
      {courses.map((item) => (
        <div>
          <Link href={`courses/${item.id}`}>
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
 
export default CoursesPage;