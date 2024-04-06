export function sidebarLinks() {
  const isStudent = localStorage.getItem("is_student") === "true";
  const isSales = localStorage.getItem("is_sales") === "true";
  const isTeacher = localStorage.getItem("is_teacher") === "true";
  const isWebAdmin = localStorage.getItem("isWebAdmin") === "true";

  let filteredLinks = [];

  // Common links for all users
  filteredLinks.push(
   
  );

  // Additional links based on user privileges
  if (isTeacher) {
    filteredLinks.push(
      {
        imgURL: "/assets/icons/home.svg",
        route: "/",
        label: "Home",
      },
      {
        imgURL: "/assets/icons/people.svg",
        route: "/profile/",
        label: "Profile",
      },
      {
        imgURL: "/assets/icons/bookmark.svg",
        route: "/explore",
        label: "Course",
      },
      {
        imgURL: "/assets/icons/calender.svg",
        route: "/event",
        label: "Events",
      },
      {
        imgURL: "/assets/icons/people.svg",
        route: "/my-students",
        label: "My Students",
      }
    );
  }


  if (isStudent) {
    filteredLinks.push(
      {
        imgURL: "/assets/icons/home.svg",
        route: "/",
        label: "Home",
      },
      {
        imgURL: "/assets/icons/people.svg",
        route: "/profile/",
        label: "Profile",
      },
      {
        imgURL: "/assets/icons/bookmark.svg",
        route: "/explore",
        label: "Course",
      },
      {
        imgURL: "/assets/icons/bookmark.svg",
        route: "/courses",
        label: "My Courses",
      },
      {
        imgURL: "/assets/icons/bookmark.svg",
        route: "/books",
        label: "Books",
      },
      {
        imgURL: "/assets/icons/calender.svg",
        route: "/my-event",
        label: "Events",
      },
    );
  }

  // Add sales-related links if the user is in sales
  if (isSales) {
    filteredLinks.push(
      {
        imgURL: "/assets/icons/home.svg",
        route: "/",
        label: "Home",
      },
      {
        imgURL: "/assets/icons/people.svg",
        route: "/profile/",
        label: "Profile",
      },
      {
        imgURL: "/assets/icons/bookmark.svg",
        route: "/explore",
        label: "Course",
      },
      {
        imgURL: "/assets/icons/bookmark.svg",
        route: "/books",
        label: "Books",
      },
      {
        imgURL: "/assets/icons/calender.svg",
        route: "/event",
        label: "Events",
      },
      {
        imgURL: "/assets/icons/people.svg",
        route: "/sales-students",
        label: "My Students",
      }
    );
  }

  // Add web admin-related links if the user is a web admin
  if (isWebAdmin) {
    filteredLinks.push(
      // Add web admin-related links here
  
      {
        imgURL: "/assets/icons/posts.svg",
        route: "/access-post",
        label: "Post Edit",
      },
      
      {
        imgURL: "/assets/icons/bookmark.svg",
        route: "/access-course",
        label: "Course Edit",
      },
      {
        imgURL: "/assets/icons/bookmark.svg",
        route: "/books",
        label: "Books",
      },
      {
        imgURL: "/assets/icons/calender.svg",
        route: "/access-events",
        label: "Events Edit",
      },
      {
        imgURL: "/assets/icons/people.svg",
        route: "/my-students",
        label: "Students Edit",
      },
      {
        imgURL: "/assets/icons/people.svg",
        route: "/Home-staff",
        label: "Staff Edit",
      },
      {
        imgURL: "/assets/icons/people.svg",
        route: "/my-sales",
        label: "Sales Edit",
      },


      {
        imgURL: "/assets/icons/settings.svg",
        route: "/profile/",
        label: "Setting & Profile",
      },


    );
  }

  return filteredLinks;
}






export const bottombarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: "/explore",
    label: "Course",
  },
  {
    imgURL: "/assets/icons/gallery-add.svg",
    route: "/event",
    label: "Events",
  },
  {
    imgURL: "/assets/icons/people.svg",
    route: "/profile/",
    label: "Profile",
  },
 
  
  {
    imgURL: "/assets/icons/home.svg",
    route: "/create-post",
    label: "Create Post",
  },
  {
    imgURL: "/assets/icons/books.svg",
    route: "/course-books",
    label: "Publish Books",
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: "/create-course",
    label: "Create Course",
  },


  {
    imgURL: "/assets/icons/calender.svg",
    route: "/events",
    label: "Create Event",
  },

  {
    imgURL: "/assets/icons/staff.svg",
    route: "/create-staff",
    label: "Create Staff",
  },
  {
    imgURL: "/assets/icons/salesperson.svg",
    route: "/create-sales",
    label: "Create Sales",
  },
  {
    imgURL: "/assets/icons/home.svg",
    route: "/access-post",
    label: "Post Edit",
  },
  
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: "/access-course",
    label: "Course Edit",
  },
  {
    imgURL: "/assets/icons/calender.svg",
    route: "/access-events",
    label: "Events Edit",
  },
  {
    imgURL: "/assets/icons/calender.svg",
    route: "/my-students",
    label: "Students Edit",
  },
  {
    imgURL: "/assets/icons/calender.svg",
    route: "/Home-staff",
    label: "Staff Edit",
  },
  {
    imgURL: "/assets/icons/calender.svg",
    route: "/my-sales",
    label: "Sales Edit",
  },


  {
    imgURL: "/assets/icons/people.svg",
    route: "/profile/",
    label: "Setting & Profile",
  },

  {
    imgURL: "/assets/icons/notification.svg",
    route: "/my-event",
    label: "Notifications",
  },

  
];






export const bottomLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: "/explore",
    label: "Course",
  },
  {
    imgURL: "/assets/icons/gallery-add.svg",
    route: "/event",
    label: "Events",
  },
  {
    imgURL: "/assets/icons/people.svg",
    route: "/profile/",
    label: "Profile",
  },
 
 
  
];
