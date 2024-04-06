import { Loader, SingleCourseCard } from "@/components/shared";
import { useParams } from "react-router-dom";
import { UpdateCourse } from "@/lib/appwrite/api";
import { useQuery } from "@tanstack/react-query";

const SingleCourse = () => {
  const { _id } = useParams<{ _id: string }>();
  const { data: updatecourse, isLoading: isCoursesLoading } = useQuery(
    ["course", _id], // Unique key for this query
    () => _id ? UpdateCourse(_id) : Promise.reject("No _id provided") // Fetch function, handle the case when _id is undefined
  );


  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Course Edit</h2>
          {isCoursesLoading ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {updatecourse ? (
               <SingleCourseCard usercourse={updatecourse.usercourse} course={updatecourse.course} action={"Create"} />
              ) : (
                <p>No course found</p>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
};


export default SingleCourse;

