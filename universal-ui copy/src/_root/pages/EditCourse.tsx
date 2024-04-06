// import { useToast } from "@/components/ui/use-toast";
import { Loader,  SingleCourseCard} from "@/components/shared";
import {  useGetRecentCourses,  } from "@/lib/react-query/queries";

const EditCourse = () => {
  // const { toast } = useToast();
  const { data: courses, isLoading: isCourseLoading} =  useGetRecentCourses();

  
    return (
      <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Course</h2>
          {isCourseLoading && !courses ? (
            <Loader />
          ) : (
          

      <ul className="flex flex-col flex-1 gap-9 w-full">
      {courses && Array.isArray(courses) && courses.map((course) => (
        <SingleCourseCard key={course._id} course={course} action={"Create"} usercourse={{
          $id: "",
          $collectionId: "",
          $databaseId: "",
          $createdAt: "",
          $updatedAt: "",
          $permissions: []
        }} />
      ))}
      {/* If there are no posts */}
      {courses && courses.length === 0 && (
        <p className="text-light-1">No Course found.</p>
      )}
      </ul>
          )}
        </div>
      </div>
    </div>
    
    );
};

export default EditCourse;
