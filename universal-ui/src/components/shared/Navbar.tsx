import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation,  useNavigate  } from "react-router-dom";
import { bottombarLinks } from "@/constants";
import { AiOutlineSearch } from 'react-icons/ai';
import axios from "axios";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { Button } from "@/components/ui/button";

interface Course {
  _id: string;
  title: string;
  // Define other properties of a course if needed
}

interface Props {
  onSearch: (data: any) => void; // Define the type of onSearch as a function that accepts any data and returns void
}


const Navbar: React.FC<Props> = ({ onSearch }) => {
 
    const isStudent = localStorage.getItem("is_student") === "true";
    const isSales = localStorage.getItem("is_sales") === "true";
    const isTeacher = localStorage.getItem("is_teacher") === "true";
    const isWebAdmin = localStorage.getItem("isWebAdmin") === "true";
  
    // Filter links based on user privileges
    const filteredLinks = bottombarLinks.filter((link) => {
      if (isTeacher) {
        return link.label === "Notifications";
      } else if (isStudent || isSales) {
        return link.label === "Notifications" ;
      } else if (isWebAdmin) {
        return link.label === "Create Post" || link.label === "Publish Books" || link.label === "Create Course" 
        || link.label === "Create Event" || link.label === "Create Staff" || link.label === "Create Sales" ||
        link.label === "Notifications" || link.label === "Logout";
      }
      return true; // Return true for other cases
    });
  
    // Filtered links with label and imgUrl from local storage
    const filteredLinksLocalStorage = filteredLinks.map((link) => {
      // Here you can customize the imgUrl based on your requirements
      let imgUrl = localStorage.getItem(`${link.label}_imgUrl`);
      // If imgUrl is not stored in local storage, fallback to the link's original imgUrl
      if (!imgUrl) {
        imgUrl = link.imgURL;
      }
      return { ...link, imgUrl };
    });
  
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Course[]>([]); // State to hold search results
    const searchRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
          setSearchResults([]); // Clear search results if clicked outside the search component
        }
      };
  
      document.body.addEventListener('click', handleClickOutside);
  
      return () => {
        document.body.removeEventListener('click', handleClickOutside);
      };
    }, []);
  
    const handleSearch = async (e: React.FormEvent) => {
      e.preventDefault(); // Prevent the default form submission behavior
      try {
        const response = await axios.get(`http://127.0.0.1:8000/Account/api/course/filter/?search=${searchQuery}`);
        setSearchResults(response.data); // Update searchResults state with fetched data
  
        // Call onSearch prop with searchResults data
        onSearch(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
  
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
  
 
  return (
    <nav className="top-navbar  md:flex justify-between items-center bg-gray-800 p-4">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" className="text-white text-lg font-semibold">
          Universal
        </Link>
        <div style={{ padding: "1px" }} ref={searchRef}>
          <form className='w-[400px] relative' onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="search"
                placeholder='Search Here'
                className='w-full p-2 bg-slate-600'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className='absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-slate-600 rounded-full'>
                <AiOutlineSearch />
              </button>
            </div>
          </form>
        </div>

        <div>
          {searchResults.map((course) => (
            <div className="absolute top-20 p-4 bg-slate-800 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2" key={course._id}>
              <Link to={`/edit-course/${course._id}`}>{course.title}</Link>
            </div>
          ))}
        </div>
      </div>


      <div className="flex gap-4 items-center">
  {filteredLinksLocalStorage.map((link) => {
    const isActive = pathname === link.route;
    return (
      <Link
        key={`topnavbar-${link.label}`}
        to={link.route}
        className={`text-white hover:text-gray-300 transition ${isActive ? "font-bold" : ""}`}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }} // Align items top to bottom
      >
        <img src={link.imgUrl} alt={link.label} className="w-6 h-6 mr-1" style={{ display: "block" }} />
      
      </Link>
    );
  })}
<Button
  variant="ghost"
  className="shad-button_ghost"
  onClick={handleLogout}
  style={{ display: "flex", flexDirection: "column", alignItems: "center" }} 
>
  <img  className="w-6 h-6 mr-1"  src="/assets/icons/logout.svg" alt="logout" />
 
</Button>

</div>


    </nav>
  );
};

export default Navbar;
