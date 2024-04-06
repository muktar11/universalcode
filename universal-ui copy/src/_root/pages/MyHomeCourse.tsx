import { Models } from "appwrite";
// import { useToast } from "@/components/ui/use-toast";
import { Loader, SecondForm} from "@/components/shared";
import { useGetRecentUserCourses } from "@/lib/react-query/queries";

const MyHomeCourse = () => {
  const { data: usercourses, isLoading: isCourseLoading } = useGetRecentUserCourses();

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">My Courses</h2>
          {isCourseLoading && !usercourses ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {usercourses && usercourses.length > 0 ? (
                usercourses[0].courses.map((course: Models.Document) => (
                  <SecondForm key={course.id} course={course} />
                ))
              ) : (

                <p className="body-medium text-light-1">You have no courses</p>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyHomeCourse;

