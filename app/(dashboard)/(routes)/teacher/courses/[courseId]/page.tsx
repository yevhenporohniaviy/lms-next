const CourseIdPage = ({ params }: { params: { courseId: string } }) => {
  return (
    <div>
      Course { params.courseId}
    </div>
  )
};
 
export default CourseIdPage;