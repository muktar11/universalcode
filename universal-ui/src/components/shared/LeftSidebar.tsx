import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { sidebarLinks } from "@/constants"; // Importing the sidebarLinks function
import { Loader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useGetRecentProfiles } from "@/lib/react-query/queries";

const LeftSidebar = () => {
  const { data: profile, isLoading: isProfileLoading, isError: isErrorProfile } = useGetRecentProfiles();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const signOutMutation = useSignOutAccount();

 

  const handleLogout = async () => {
    try {
      await signOutMutation.mutateAsync();
      navigate('/sign-in');
    } catch (error) {
      // Handle logout error if needed
    }
  };

  if (isProfileLoading) {
    return <Loader />;
  }

  if (isErrorProfile) {
    return <p>Error fetching profile</p>;
  }

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-7">
        {profile && (
          <>
            <img
              src={ profile.profile_imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{profile.first_name} {profile.last_name}</p>
              <p className="small-regular text-light-3">@{profile.emailfield}</p>
            </div>
          </>
        )}

        <ul className="flex flex-col gap-0">
          {sidebarLinks().map((link) => ( // Calling sidebarLinks function and mapping over its return
            <li
              key={link.label}
              className={`leftsidebar-link group ${pathname === link.route && "bg-primary-300"}`}>
              <NavLink to={link.route} className="flex gap-4 items-center p-2">
                <img
                  src={link.imgURL}
                  alt={link.label}
                  className={`group-hover:invert-white ${pathname === link.route && "invert-white"}`}
                />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={handleLogout}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
