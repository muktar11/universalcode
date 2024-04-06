import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import {
  createUserAccount,
  createUserStaffAccount,
  signInAccount,
  getRecentStaff,
  signOutAccount,
  createPost,
  getRecentProfiles,
  createCourse,
  UpdateCourse,
  UpdateCourseDate,
  DeleteCourseDate,
  purchaseCourse,
  publishBookAccount,
  getRecentUserCourses,
  getRecentEvents,
  getRecentUserEvents,
  createUpdateProfilePic,
  createEvent,
  updateEvent,
  updateUserStudentAccount,
  UpdatePost,
  createUserSalesAccount,
  getRecentSalesStudents,
  getRecentPosts,
  getRecentCourses,
  getRecentBooks,
  getRecentStudent,
  getRecentSales,
  updatePassword,
} from "@/lib/appwrite/api";
import { INewPost, INewCourse,INewStudentUser, INewLoginUser,
    IUpdatePassword, IUpdateProfilePic, ISalesUser,
 INewEvent, 
 IUpdateCourse,
 IUpdateEvent,
 IStaffUser,
 IPublishBookUser} from "@/types";
import { useState } from "react";
// ============================================================
// AUTH QUERIES
// ============================================================





  
export const useCreateUserAccount = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createUser = async (user: INewStudentUser) => { // Renamed the function to createUser
    setIsLoading(true);
    try {
      const newUser = await createUserAccount(user);
      return newUser;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const mutateAsync = async (user: INewStudentUser) => {
    return createUserAccount(user);
  };

  return { createUserAccount: createUser, isLoading, mutateAsync }; // Return the renamed function
};


export const useCreateStaffUserAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const createUser = async (user: IStaffUser) => { // Renamed the function to createUser
    setIsLoading(true);
    try {
      const newUser = await createUserStaffAccount(user);
      return newUser;
    } catch (error) {
      console.log(error)
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const mutateAsync = async (user: IStaffUser) => {
    return createUserStaffAccount(user);
  };
  return {createUserStaffAccount: createUser, isLoading, mutateAsync }; // Return the renamed function
};


export const useCreateSalesUserAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const createUser = async (user: ISalesUser) => { // Renamed the function to createUser
    setIsLoading(true);
    try {
      const newUser = await createUserSalesAccount(user);
      return newUser;
    } catch (error) {
      console.log(error)
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const mutateAsync = async (user: ISalesUser) => {
    return createUserSalesAccount(user);
  };
  return {createUserSalesAccount: createUser, isLoading, mutateAsync }; // Return the renamed function
};




export const usePublishBookAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const createBook = async (book: IPublishBookUser) => { // Renamed the function to createUser
    setIsLoading(true);
    try {
      const newBook = await publishBookAccount(book);
      return newBook;
    } catch (error) {
      console.log(error)
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const mutateAsync = async (book: IPublishBookUser) => {
    return publishBookAccount(book);
  };
  return {publishBookAccount: createBook, isLoading, mutateAsync }; // Return the renamed function
};



export const  useSignInAccount = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createUser = async (user: INewLoginUser) => { // Renamed the function to createUser
    setIsLoading(true);
    try {
      const newUser = await signInAccount(user);
      return newUser;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const mutateAsync = async (user: INewLoginUser) => {
    return signInAccount(user);
  };

  return { signInAccount: createUser, isLoading, mutateAsync }; // Return the renamed function
}




export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

// ============================================================
// POST QUERIES
// ============================================================


export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};

export const useGetRecentCourses = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_COURSE],
    queryFn: getRecentCourses,
  });
};

export const useGetRecentBooks = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_COURSE],
    queryFn:  getRecentBooks,
  });
};


export const useGetStaffUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_STAFF],
    queryFn: getRecentStaff,
  });
};

export const useGetStudentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_STAFF],
    queryFn: getRecentStudent,
  });
};


export const useGetSalesUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_STAFF],
    queryFn: getRecentSales,
  });
};

export const useGetRecentEvents = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_EVENTS],
    queryFn: getRecentEvents,
  });
};

export const useGetRecentUserCourses = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_USER_COURSE],
    queryFn: getRecentUserCourses,
  });
};

export const useGetRecentSalesStudents = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_USER_COURSE],
    queryFn: getRecentSalesStudents,
  });
};

export const useGetRecentUserEvents = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_USER_COURSE],
    queryFn:  getRecentUserEvents,
  });
};



export const useGetRecentProfiles = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_PROFILE],
    queryFn: getRecentProfiles,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};




export const useUpdatePost = (_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: any) => UpdatePost(post, _id), // Pass _id to UpdatePost
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_UPDATE_POST, _id], // Pass _id to queryKey
      });
    },
  });
};




export const useUpdateUserStudent = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUserStudentAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.GET_UPDATE_USER]); // Wrap QUERY_KEYS.GET_UPDATE_USER in an array
    },
  });
};


export const useUpdateProfilePic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: IUpdateProfilePic) => createUpdateProfilePic(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PROFILE_PIC_UPDATE],
      });
    },
  });
};




export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (course: INewCourse) =>  createCourse(course),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_COURSE],
      });
    },
  });
};

export const usePurchseCourse = (course_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>  purchaseCourse(course_id), // Pass the course_id parameter
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_COURSE_PURCHASE],
      });
    },
  });
};



export const useUpdateCourse = (_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => UpdateCourse(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_UPDATE_COURSE, _id],
      });
    },
  });
};




export const useUpdateCourseDate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courses: IUpdateCourse) =>  UpdateCourseDate(courses),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_COURSE_UPDATE],
      });
    },
  });
};


export const useDeleteCourseDate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courses: IUpdateCourse) =>  DeleteCourseDate(courses),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_COURSE_UPDATE],
      });
    },
  });
};

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (password: IUpdatePassword) =>  updatePassword(password),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.UPDATE_PASSWORD],
      });
    },
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (event: INewEvent) =>  createEvent(event),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_COURSE],
      });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (event: IUpdateEvent) => updateEvent(event),
    onSuccess: (event) => { // Adding type guard to ensure event is defined
      if (event && event.id) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_UPDATE_COURSE, event.id],
        });
      }
    },
  });
};
