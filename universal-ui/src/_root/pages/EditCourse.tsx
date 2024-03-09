import { Models } from "appwrite";
// import { useToast } from "@/components/ui/use-toast";
import { Loader,  EditCourseCard} from "@/components/shared";
import {  useGetRecentCourses,  } from "@/lib/react-query/queries";

const EditCourse = () => {
  // const { toast } = useToast();
  const { data: course, isLoading: isCourseLoading} =  useGetRecentCourses();

  
    return (
      <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Course</h2>
          {isCourseLoading && !course ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {course && course.map((courses: Models.Document) => (
                <EditCourseCard key={courses.id} course={courses} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
    
    );
};

export default EditCourse;
