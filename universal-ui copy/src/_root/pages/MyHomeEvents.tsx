// import { useToast } from "@/components/ui/use-toast";
import { Loader,  MyEventCard} from "@/components/shared";
import {  useGetRecentUserEvents } from "@/lib/react-query/queries";

const MyHomeEvents = () => {
  // const { toast } = useToast();
  const { data: event, isLoading: isEventLoading} = useGetRecentUserEvents();


    return (
      <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Events</h2>
          {isEventLoading && !event ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
            {event && event.my_events && event.my_events.map((singleEvent: any) => (
              <MyEventCard key={singleEvent.id} event={singleEvent} />
            ))}
          </ul>
          
          )}
        </div>
      </div>
    </div>
    
    );
};

export default MyHomeEvents;
