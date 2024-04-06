import { Models } from "appwrite";
import { Button } from "../ui/button";
import {  useNavigate } from "react-router-dom";
import { useUpdateCourse, } from "@/lib/react-query/queries";

type CourseCardProps = {
    course: Models.Document;
};


const EditCourseCard = ({ course }: CourseCardProps) => {
    const { mutate, isLoading } = useUpdateCourse(course._id);
    const navigate = useNavigate();

    const handleEdit = async () => {
        try {
            await mutate({});
            navigate(`/edit-course/${course._id}`);
        } catch (error) {
            console.error('Update failed:', error);
        }
    };
  return (
  
    <div className="post-card">
       
      <div className="flex-between">
    
            <div className="flex items-center gap-3">
           
            <img src={"/assets/icons/universal.svg"} alt="creator" className="w-12 lg:h-12 rounded-full"/>
           
              <div className="flex flex-col">
              <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular ">  {course.title}</p>
              </div>
              <p className="subtle-semibold lg:small-regular"> CreatedBy {course.Instructor}</p>
              </div>
            </div>  
      </div>


    
                  <div className="flex items-center gap-3">

                    
                    <img src={course.image || "/assets/icons/profile-placeholder.svg"} alt="post image" className="post-card_img"/>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="subtle-semibold lg:small-regular "> {course.content}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="subtle-semibold lg:small-regular "> Language {course.language}</p>
                  </div>
                  <div className="flex items-center gap-3">      
                    <p className="subtle-semibold lg:small-regular">Course Starting Date {course.startingday} Course Ending Date {course.endingday}</p>
                  </div>
          
                  <div className="flex items-center gap-3">      
                    <p className="subtle-semibold lg:small-regular">Course Duration {course.courseduration} Class Starting Time {course.streamingtime}</p>
              
                    </div>

                 
                
                    <div className="flex items-center gap-3">
                    <Button
          type="button"
          size="sm"
          className="shad-button_primary px-5"
          onClick={handleEdit} // Call handlePurchase when the button is clicked
          disabled={isLoading} // Disable the button if the mutation is in progress
        >
          {isLoading ? 'Edit...' : 'Edit Course'}
        </Button>
       
                    </div>

                  
                 


     
    </div>
  );
};

export default EditCourseCard;
