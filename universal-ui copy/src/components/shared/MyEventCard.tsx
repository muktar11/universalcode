import { Models } from "appwrite";


type EventsCardProps = {
    event: Models.Document;
};

const MyEventCard = ({ event }: EventsCardProps) => {

  return (
    <div className="post-card">
    <div className="flex-between">
          <div className="flex items-center gap-3">
          <img src={"/assets/icons/profile-placeholder.svg"} alt="creator" className="w-12 lg:h-12 rounded-full"/>

            <div className="flex flex-col">
            <div className="flex-center gap-2 text-light-3">
                  <p className="subtle-semibold lg:small-regular ">  {event.title}</p>
            </div>
         
            </div>
          </div>  
    </div>

              
                <div className="flex items-center gap-3">
                  <p className="subtle-semibold lg:small-regular "> Class {event.audience}</p>
                </div>
                <div className="flex items-center gap-3">      
                  <p className="subtle-semibold lg:small-regular">Course Starting Date {event.startingday} Course Ending Date {event.endingday}</p>
                </div>
        
                <div className="flex items-center gap-3">      
                  <p className="subtle-semibold lg:small-regular">Course Starting Time {event.startingtime} Class Ending Time {event.streamingtime}</p>
            
                  </div>

               
              

                

    


   
  </div>
  );
};

export default MyEventCard;
