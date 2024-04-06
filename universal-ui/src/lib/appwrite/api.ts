
import {INewStudentUser,IUpdatePassword, INewEvent, 
  INewLoginUser, IUpdateEvent} from "@/types";


const apiUrl = 'http://localhost:8000';
console.log('api',apiUrl)
  import axios from 'axios';

  export async function createUserAccount(user: INewStudentUser) {
    try {
      const eventData = { ...user };


        const response = await fetch(apiUrl+'/Account/api/register/student', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data)   
        if (data && data.message === "User registered successfull") {
          return true; // Indicate success
        } else {
          throw new Error('Failed to register user');
        }
      } else {
        // Log the response data for debugging
        const responseData = await response.json();
        console.error("Failed to create user account:", responseData);
        throw new Error('Failed to create user account');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  


/*
export async function createUserStaffAccount(user: IStaffUser) {
  try {
    const eventData = { ...user };
    console.log(eventData)
    const response = await fetch(apiUrl+'/Account/api/register/staff', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      
      if (data && data.message === "Registration successful") {
        return true; // Indicate success
      } else {
        throw new Error('Failed to register user');
      }
    } else {
      throw new Error('Failed to create user account');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
*/


export async function createUserStaffAccount(user: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  birthday: string;
  bio: string;
  extracurricular: string;
  mda_imageUrl: File[];
  photo_imageUrl: File[];
  school_credential_imageUrl: File[];
  terms_and_agreement_imageUrl: File[];
}): Promise<any> {
  try {
    // Upload file as FormData
    const formData: FormData | null = await uploadFile(user.photo_imageUrl[0]);
    if (!formData) throw new Error('Failed to upload file');

    // Prepare data to send
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('address', user.address);
    formData.append('birthday', user.birthday);
    formData.append('bio', user.bio);
    formData.append('extracurricular', user.extracurricular);
    formData.append('mda_imageUrl', user.mda_imageUrl[0]);
    formData.append('photo_imageUrl', user.photo_imageUrl[0]);
    formData.append('school_credentials_imageUrl  ', user.school_credential_imageUrl[0]);
    formData.append('terms_and_agreement_imageUrl', user.terms_and_agreement_imageUrl[0]);

    // Send POST request
    const response = await axios.post(apiUrl+'/Account/api/register/staff', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 200) {
      const data = await response.data;
      console.log(data);
      
      if (data && data.message === "Registration successful") {
        return true; // Indicate success
      } else {
        throw new Error('Failed to register user');
      }
    } else {
      throw new Error('Failed to create user account');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}




export async function createUserSalesAccount(user: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  birthday: string;
  mda_imageUrl: File[];
  photo_imageUrl: File[];
  terms_and_agreement_imageUrl: File[];
}): Promise<any> {
  try {
    // Upload file as FormData
    const formData: FormData | null = await uploadFile(user.photo_imageUrl[0]);
    if (!formData) throw new Error('Failed to upload file');
    // Prepare data to send
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('address', user.address);
    formData.append('birthday', user.birthday);
    formData.append('mda_imageUrl', user.mda_imageUrl[0]);
    formData.append('photo_imageUrl', user.photo_imageUrl[0]);
    formData.append('terms_and_agreement_imageUrl', user.terms_and_agreement_imageUrl[0]);

    // Send POST request
    const response = await axios.post(apiUrl+'/Account/api/register/sales', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 200) {
      const data = await response.data;
      console.log(data);
      
      if (data && data.message === "Registration successful") {
        return true; // Indicate success
      } else {
        throw new Error('Failed to register user');
      }
    } else {
      throw new Error('Failed to create user account');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}




export async function publishBookAccount(book: {
  audience: string;
  caption: string;
  Book_imageUrl: File[];
}): Promise<any> {
  try {
    // Upload file as FormData
    const formData: FormData | null = await uploadFile(book.Book_imageUrl[0]);
    if (!formData) throw new Error('Failed to upload file');
    // Prepare data to send
    formData.append('audience', book.audience);
    formData.append('caption', book.caption);
    formData.append('Book_imageUrl', book.Book_imageUrl[0]);

    // Send POST request
    const response = await axios.post(apiUrl+'/Account/api/register/books', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 200) {
      const data = await response.data;
      console.log(data);
      
      if (data && data.message === "Registration successful") {
        return true; // Indicate success
      } else {
        throw new Error('Failed to register user');
      }
    } else {
      throw new Error('Failed to create user account');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}





export async function updateUserStudentAccount(user: {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  birthday: string;
}): Promise<any> {
  try {
    // Upload file as FormData
   
    const formData = new FormData();
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('address', user.address);
    formData.append('birthday', user.birthday);
    // Send POST request
    const response = await axios.put(apiUrl+`/Account/api/user/update/${user.id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 200) {
      const data = await response.data;
      console.log(data);
      
      if (data && data.message === "Registration successful") {
        return true; // Indicate success
      } else {
        throw new Error('Failed to register user');
      }
    } else {
      throw new Error('Failed to create user account');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}



export async function signInAccount(user: INewLoginUser) {
  try {
    
    const login = {
      email: user.email,
      password: user.password
    } 
    const response = await fetch(apiUrl+'/Account/token/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    });

    if (response.ok) {
       const data = await response.json();
      const accessTokenExpiration = new Date();
      accessTokenExpiration.setTime(accessTokenExpiration.getTime() + (24 * 60 * 60 * 1000)); // 24 hours from now
      localStorage.setItem("accessToken", JSON.stringify({ token: data.access, expiry: accessTokenExpiration.getTime() }));
      localStorage.setItem("first_name", data.first_name);
      localStorage.setItem("last_name", data.last_name);
      localStorage.setItem("id", data.id);
      localStorage.setItem("is_student", data.is_student ? "true" : "false");
      localStorage.setItem("is_sales", data.is_sales ? "true" : "false");
      localStorage.setItem("is_teacher", data.is_teacher ? "true" : "false");
      localStorage.setItem("isWebAdmin", data.isWebAdmin ? "true" : "false");
    } else {
      throw new Error('Failed to create user account');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}



// ============================== SIGN OUT
export async function signOutAccount() {
  try {
    // Assuming you also want to clear localStorage when signing out
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("id");
  } catch (error) {
    console.log(error);
    throw error;
  }
}



export async function createPost(post: { caption: string; file: File[] }): Promise<any> {
  try {
    const formData: FormData | null = await uploadFile(post.file[0]);
    if (!formData) throw new Error('Failed to upload file');
    formData.append('caption', post.caption)
    formData.append('image', post.file[0])
    console.log(formData);
    // Send POST request
    const response = await axios.post(apiUrl+'/Account/api/register/post', formData);
   
    
    return response.data; // Assuming the response contains the created post data
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error for handling elsewhere if needed
  }
}


export async function UpdatePost(post: { caption: string; file: File[]}, _id: string ): Promise<any> {
  try {
    const formData: FormData | null = await uploadFile(post.file[0]);
    if (!formData) throw new Error('Failed to upload file');
    formData.append('caption', post.caption)
    formData.append('image', post.file[0])
    console.log(formData);
    // Send POST request
    const response = await axios.put(apiUrl+`/Account/api/edit/post/${_id}/`, formData);
   
    
    return response.data; // Assuming the response contains the created post data
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error for handling elsewhere if needed
  }
}

export async function createCourse(course: {
  Instructor: string;
  title: string;
  language: string;
  content: string;
  courseduration: string;
  streamingtime: string;
  startingday: string;
  endingday: string;
  file: File[];
}): Promise<any> {
  try {
    // Upload file as FormData
    const formData: FormData | null = await uploadFile(course.file[0]);
    if (!formData) throw new Error('Failed to upload file');

    // Prepare data to send
    formData.append('Instructor', course.Instructor);
    formData.append('title', course.title);
    formData.append('language', course.language);
    formData.append('content', course.content);
    formData.append('courseduration', course.courseduration);
    formData.append('streamingtime', course.streamingtime);
    formData.append('startingday', course.startingday);
    formData.append('endingday', course.endingday);
    formData.append('image', course.file[0]);

    // Send POST request
    const response = await axios.post(apiUrl+'/Account/api/register/course', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // Assuming the response contains the created course data
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error for handling elsewhere if needed
  }
}

export async function purchaseCourse(course_id: string) {
  try {
    const user_id = localStorage.getItem('id');
    const response = await axios.post(apiUrl+`/Account/api/students/course/${user_id}/${course_id}/`);

    return response.data; // Assuming the response contains the created course data
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error for handling elsewhere if needed
  }
}



export async function UpdateCourse(_id: string) {
  try {
    const response = await fetch(apiUrl+`/Account/api/edit/course/${_id}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const updatecourse = await response.json();
    console.log('updatecourse', updatecourse)
    return  updatecourse; // Assuming the response contains the updated course data
  
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
}


export async function UpdateCourseDate(courses: {
  _id: string;
  Instructor: string;
  title: string;
  language: string;
  content: string;
  courseduration: string;
  streamingtime: string;
  startingday: string;
  endingday: string;
  file?: File[]; // Making file optional
}): Promise<any> {
  try {
    let formData: FormData | null = null;

    // Check if file is provided
    if (courses.file && courses.file.length > 0) {
      // Upload file as FormData
      formData = await uploadFile(courses.file[0]);
      if (!formData) throw new Error('Failed to upload file');

      // Append file data
      const uploadedFile: File = courses.file[0];
      const fileFormDataName: string = `image`;
      formData.append(fileFormDataName, uploadedFile);
    }

    // Prepare data to send
    const requestData: any = {
      Instructor: courses.Instructor,
      title: courses.title,
      language: courses.language,
      content: courses.content,
      courseduration: courses.courseduration,
      streamingtime: courses.streamingtime,
      startingday: courses.startingday,
      endingday: courses.endingday,
    };

    // Check if formData exists, if not, initialize it
    if (!formData) {
      formData = new FormData();
    }

    // Append requestData to formData
    Object.keys(requestData).forEach(key => {
      formData!.append(key, requestData[key]);
    });

    // Send POST request
    const response = await axios.put(apiUrl + `/Account/api/edit/course/${courses._id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // Assuming the response contains the updated course data
  } catch (error) {
    console.log('err', error);
    throw error; // Re-throw the error for handling elsewhere if needed
  }
}



export async function DeleteCourseDate(courses: {
  _id: string;
  Instructor: string;
  title: string;
  language: string;
  content: string;
  courseduration: string;
  streamingtime: string;
  startingday: string;
  endingday: string;
  file: File[];
}): Promise<any> {
  try {
    const response = await axios.delete(apiUrl+`/Account/api/edit/course/${courses._id}/`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Assuming the response contains the created course data
  } catch (error) {
    console.log('err',error);
    throw error; // Re-throw the error for handling elsewhere if needed
  }
}






export async function createEvent(event: INewEvent) {
  try {
    // Prepare data to send
    const updateeventData = {

      title: event.title, 
      startingtime: event.startingtime,
      endtime: event.endtime,  
      description: event.description,  
      startingday: event.startingday,  
      endingday: event.endingday,  
      audience: event.audience,
      class_link: event.class_link,
      class_password: event.class_password,
    };

    // Send POST request
    const response = await axios.post(apiUrl+'/Account/api/register/events/', updateeventData);

    return response.data; // Assuming the response contains the created course data
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error for handling elsewhere if needed
  }
}




export async function updateEvent(event:IUpdateEvent) {
  try {
    // Prepare data to send
    const eventData = {
      id: event.id,
      title: event.title, 
      startingtime: event.startingtime,
      endtime: event.endtime,  
      description: event.description,  
      startingday: event.startingday,  
      endingday: event.endingday,  
      audience: event.audience,
      class_link: event.class_link,
      class_password: event.class_password,
    };
  
    // Send POST request
    const response = await axios.put(apiUrl+`/Account/api/register/events/${eventData.id}/`, eventData);

    return response.data; // Assuming the response contains the created course data
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error for handling elsewhere if needed
  }
}




export async function updatePassword(password: IUpdatePassword) {
  try {
    // Prepare data to send
    const passworddata = {
      email: password.email,
      new_password: password.new_password, 
      confirm_password: password.confirm_password, 
    };
    // Send POST request
    const response = await axios.post(apiUrl+'/Account/reset-password/', passworddata);
    return response.data; // Assuming the response contains the created course data
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error for handling elsewhere if needed
  }
}

export async function createUpdateProfilePic(post: {
  caption: string;
  file: File[];
}): Promise<any> {
  try {
    const studentid = localStorage.getItem('id')
    const formData: FormData | null = await uploadFile(post.file[0]);
    if (!formData) throw new Error('Failed to upload file');
      formData.append('caption', post.caption)
      formData.append('profile_imageUrl', post.file[0]);
      console.log(formData);
    // Send PUT request to update profile picture
    const response = await axios.put(apiUrl+`/Account/api/students/profile/${studentid}/`, formData);
    console.log(response);

    return response.data; // Assuming the response contains the updated profile data
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error for handling elsewhere if needed
  }
}

export async function uploadFile(file: File): Promise<FormData | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    return formData;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// ============================== GET FILE URL
export function getFilePreview(file: string): string {
  try {
    // Simulating file preview by returning the blob URL
    return file;
  } catch (error) {
    console.log(error);
    return '';
  }
}


export async function getRecentPosts() {
  try {
    const response = await fetch(apiUrl+'/Account/api/register/post');
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const posts = await response.json();
   
    return posts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getRecentBooks() {
  try {
    const response = await fetch(apiUrl+'/Account/api/register/books');
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const books = await response.json();
   
    return books;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function getRecentCourses() {
  try {
    const response = await axios.get(apiUrl+'/Account/api/register/course');
    const course = response.data; // Extracting the data from the response
   
    return course;
  } catch (error) {
    console.error(error);
    throw error;
  }
}



export async function getRecentUserCourses() {
  try {
    const id = localStorage.getItem('id')
    const response = await fetch(apiUrl+`/Account/api/retrieve/course/${id}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const usercourse = await response.json();
    console.log('usercourse', usercourse);
    return usercourse;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getRecentSalesStudents() {
  try {
    const id = localStorage.getItem('id')
    const response = await fetch(apiUrl+`/Account/api/student/sales/${id}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const usercourse = await response.json();
    console.log('usercourse', usercourse);
    return usercourse;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getRecentEvents() {
  try {
    const response = await fetch(apiUrl+'/Account/api/register/events/');
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const events = await response.json();
    console.log(events);
    return events;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getRecentUserEvents() {
  try {
    const id = localStorage.getItem('id')
    const response = await fetch(apiUrl+`/Account/api/student/event/${id}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const events = await response.json();
    console.log(events);
    return events;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function getRecentStaff() {
  try {
    const response = await fetch(apiUrl+'/Account/api/user/staff/');
    if (!response.ok) {
      throw new Error('Failed to fetch staff');
    }
    const staff = await response.json();
    return staff;
  } catch (error) {
    console.error(error);
    throw error;
  }
}



export async function getRecentStudent() {
  try {
    const response = await fetch(apiUrl+'/Account/api/user/student/');
    if (!response.ok) {
      throw new Error('Failed to fetch staff');
    }
    const staff = await response.json();
    
    return staff;
  } catch (error) {
    console.error(error);
    throw error;
  }
}




export async function getRecentSales() {
  try {
    const response = await fetch(apiUrl+'/Account/api/user/sales/');
    if (!response.ok) {
      throw new Error('Failed to fetch staff');
    }
    const staff = await response.json();
    
    return staff;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function getRecentProfiles() {
  try {
    const id = localStorage.getItem('id')
    const response = await fetch(apiUrl+`/Account/api/students/profile/${id}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const profile = await response.json();
    // Assuming the response is an object with a 'profiles' property containing an array of profiles
    console.log('profile', profile)
    return profile;
  } catch (error) {
    console.error(error);
    throw error;
  }
}



