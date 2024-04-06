import { Models } from "appwrite";
// import { useToast } from "@/components/ui/use-toast";
import { Loader,EditEventCard} from "@/components/shared";
import {  useGetRecentEvents } from "@/lib/react-query/queries";


const EventsEdit = () => {
  // const { toast } = useToast();
  const { data: event, isLoading: isEventLoading} = useGetRecentEvents();


    return (
      <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Events</h2>
          {isEventLoading && !event ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {event && event.map((events: Models.Document) => (
                <EditEventCard key={events._id} event={events} action={"Create"} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
    
    );
};

export default EventsEdit;
