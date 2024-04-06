import { Models } from "appwrite";
// import { useToast } from "@/components/ui/use-toast";
import { Loader,  CourseCard} from "@/components/shared";
import {  useGetRecentCourses,  } from "@/lib/react-query/queries";

const HomeCourse = () => {
  // const { toast } = useToast();
  const { data: course, isLoading: isCourseLoading,  isError: isErrorCourse,} =  useGetRecentCourses();

  if (isErrorCourse ) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }
  
    return (
      <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Course Feed</h2>
          {isCourseLoading && !course ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {course && course.map((courses: Models.Document) => (
                <CourseCard key={courses.id} course={courses} />
              ))}
                 {course && course.length === 0 && (
              <p className="text-light-1">No Course found.</p>
            )}
            </ul>
          
          )}
        </div>
      </div>
    </div>
    
    );
};

export default HomeCourse;
