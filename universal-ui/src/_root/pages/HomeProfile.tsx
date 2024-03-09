
import { Loader, ProfileCard} from "@/components/shared";
import {  useGetRecentProfiles, } from "@/lib/react-query/queries";

const HomeProfile = () => {
  const { data: profiles, isLoading: isProfileLoading} = useGetRecentProfiles();
 
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Profile</h2>
          {isProfileLoading && profiles ? (
            <Loader />
          ) : (
            <div>
            
             
             <ProfileCard profiles={profiles} action="Update" />

              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



export default HomeProfile;
