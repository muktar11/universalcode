import { Models } from "appwrite";

type ProfileCardProps = {
  course: Models.Document;
};

const SecondForm = ({ course }:  ProfileCardProps) => {
 
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <img src={"/assets/icons/profile-placeholder.svg"} alt="creator" className="w-12 lg:h-12 rounded-full"/>
          <div className="flex flex-col">
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">{course.title}</p>
            </div>
            <p className="subtle-semibold lg:small-regular">{course.Instructor}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <img src={course.image || "/assets/icons/profile-placeholder.svg"} alt="post image" className="post-card_img"/>
      </div>
      <div className="flex items-center gap-3">
        <p className="subtle-semibold lg:small-regular">{course.content}</p>
      </div>
      <div className="flex items-center gap-3">
        <p className="subtle-semibold lg:small-regular">Language {course.language}</p>
      </div>
      <div className="flex items-center gap-3">      
        <p className="subtle-semibold lg:small-regular">Course Starting Date {course.startingday} Course Ending Date {course.endingday}</p>
      </div>
      <div className="flex items-center gap-3">      
        <p className="subtle-semibold lg:small-regular">Course Duration {course.courseduration} Class Starting Time {course.streamingtime}</p>
      </div>
    </div>
  );
};

export default SecondForm;
