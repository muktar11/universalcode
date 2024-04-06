
import {INewStudentUser,IUpdatePassword, INewEvent, 
  INewLoginUser, } from "@/types";

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
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;

    const response = await axios.post(apiUrl+'/Account/api/register/staff', formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 200) {
      const data = await response.data;
      
      
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
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await axios.post(apiUrl+'/Account/api/register/sales', formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 200) {
      const data = await response.data;
    
      
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
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await axios.post(apiUrl+'/Account/api/register/books', formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
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
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await axios.put(apiUrl+`/Account/api/user/update/${user.id}/`, formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
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
    
    throw error;
  }
}



export async function createPost(post: 
  { caption: string; file: File[] }): Promise<any> {
  try {
    const formData: FormData | null = await uploadFile(post.file[0]);
    if (!formData) throw new Error('Failed to upload file');
    formData.append('caption', post.caption)
    formData.append('image', post.file[0])
    // Send POST request
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await axios.post(apiUrl+'/Account/api/register/post', formData, {
      headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
      // Add other headers if needed
      }
    }); 
    return response.data; // Assuming the response contains the created post data
  } catch (error) {
    
    throw error; // Re-throw the error for handling elsewhere if needed
  }
}


export async function UpdatePost(post: { caption: string; file: File[]}, _id: string ): Promise<any> {
  try {
    const formData: FormData | null = await uploadFile(post.file[0]);
    if (!formData) throw new Error('Failed to upload file');
    formData.append('caption', post.caption)
    formData.append('image', post.file[0])
    
    // Send POST request
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await axios.put(apiUrl+`/Account/api/edit/post/${_id}/`, formData,{
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
   
    
    return response.data; // Assuming the response contains the created post data
  } catch (error) {
    
    throw error; // Re-throw the error for handling elsewhere if needed
  }
}


export async function DeletePost(_id: string): Promise<any> {
  try {
    // Send DELETE request
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await axios.delete(apiUrl + `/Account/api/edit/post/${_id}/`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return response.data; // Assuming the response contains the deleted post data
  } catch (error) {
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
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await axios.post(apiUrl+'/Account/api/register/course', formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // Assuming the response contains the created course data
  } catch (error) {
    throw error; // Re-throw the error for handling elsewhere if needed
  }
}


export async function UpdateCourse(course: {
  title: string;
  language: string;
  Instructor: string;
  content: string;
  courseduration: string;
  streamingtime: string;
  startingday: string; 
  endingday: string;
  file: File[];
}, _id: string) {
  try {
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await fetch(apiUrl + `/Account/api/edit/course/${_id}/`, {
      method: 'PUT', // Assuming you are updating the course with a PUT request
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Assuming JSON content type
        // Add other headers if needed
      },
      body: JSON.stringify(course) // Convert course object to JSON string
    });

    if (!response.ok) {
      // Handle error response
      const errorMessage = await response.text(); // Get error message from response body
      throw new Error(errorMessage);
    }

    // Assuming successful response returns updated course data
    const responseData = await response.json(); // Parse response body as JSON
    return responseData;
  } catch (error) {
    
    throw error;
  }
}

export async function DeleteCourse(_id: string): Promise<any> {
  try {
    // Send DELETE request
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await axios.delete(apiUrl + `/Account/api/edit/course/${_id}/`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return response.data; // Assuming the response contains the deleted post data
  } catch (error) {
    throw error; // Re-throw the error for handling elsewhere if needed
  }
}



export async function purchaseCourse(course_id: string) {
  try {
    const user_id = localStorage.getItem('id');
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await axios.post(
      apiUrl + `/Account/api/students/course/${user_id}/${course_id}/`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' // Assuming JSON content type
          // Add other headers if needed
        }
      }
    );
    return response.data; // Assuming the response contains the created course data
  } catch (error) {
    
    throw error; // Re-throw the error for handling elsewhere if needed
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
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await axios.put(apiUrl + `/Account/api/edit/course/${courses._id}/`, formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // Assuming the response contains the updated course data
  } catch (error) {
    
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
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await axios.delete(apiUrl+`/Account/api/edit/course/${courses._id}/`, {
      headers: {
        "Authorization": `Bearer ${token}`,
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
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await axios.post(apiUrl+'/Account/api/register/events/', updateeventData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Assuming JSON content type
        // Add other headers if needed
      }
    });

    return response.data; // Assuming the response contains the created course data
  } catch (error) {
    throw error; // Re-throw the error for handling elsewhere if needed
  }
}



export async function updateEvent(event: {
  title: string;
  startingtime: string;
  endtime: string;
  description: string;
  startingday: string;
  endingday: string;
  audience: string;
  class_link: string;
  class_password: string;
}, _id: string) {
  try {
    // Create a new FormData object
    const formData = new FormData();
    formData.append('title', event.title);
    formData.append('startingtime', event.startingtime);
    formData.append('endtime', event.endtime);
    formData.append('description', event.description);
    formData.append('startingday', event.startingday);
    formData.append('endingday', event.endingday);
    formData.append('audience', event.audience);
    formData.append('class_link', event.class_link);
    formData.append('class_password', event.class_password);
    console.log('form', formData)
    // Retrieve token from local storage
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    
    // Send PUT request with Bearer token
    const response = await axios.put(
      `${apiUrl}/Account/api/register/events/${_id}/`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // No need to set Content-Type, axios handles it for FormData
          // Add other headers if needed
        }
      }
    );
  
    return response.data; // Assuming the response contains the updated event data
  } catch (error) {
   
    throw error; // Re-throw the error for handling elsewhere if needed
  }
}

export async function DeleteEvent(_id: string): Promise<any> {
  try {
    // Send DELETE request
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await axios.delete(apiUrl + `/Account/api/register/events/${_id}/`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return response.data; // Assuming the response contains the deleted post data
  } catch (error) {
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
    // Retrieve token from local storage
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;   
    // Send POST request for password reset with Bearer token
    const response = await axios.post(
      `${apiUrl}/Account/reset-password/`,
      passworddata,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Assuming JSON content type
          // Add other headers if needed
        }
      }
    );
    
    return response.data; // Assuming the response contains the result of the password reset operation
  } catch (error) {
    console.error('Error updating password:', error);
    throw error; // Re-throw the error for handling elsewhere if needed
  }
}

export async function createUpdateProfilePic(post: {
  caption: string;
  file: File[];
}): Promise<any> {
  try {
    const studentid = localStorage.getItem('id');
    const formData: FormData | null = await uploadFile(post.file[0]);
    
    if (!formData) {
      throw new Error('Failed to upload file');
    }
    formData.append('caption', post.caption);
    formData.append('profile_imageUrl', post.file[0]);
    // Retrieve token from local storage
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    // Send PUT request to update profile picture with Bearer token
    const response = await axios.put(
      `${apiUrl}/Account/api/students/profile/${studentid}/`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Assuming form data content type
          // Add other headers if needed
        }
      }
    );
    return response.data; // Assuming the response contains the updated profile data
  } catch (error) {
    console.error('Error creating or updating profile picture:', error);
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
    // Retrieve token from local storage
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await fetch(`${apiUrl}/Account/api/register/post`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Assuming JSON content type
        // Add other headers if needed
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    throw error;
  }
}


export async function getRecentBooks() {
  try {
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await fetch(apiUrl+'/Account/api/register/books', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Assuming JSON content type
        // Add other headers if needed
      }
    });
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
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await axios.get(apiUrl+'/Account/api/register/course', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Assuming JSON content type
        // Add other headers if needed
      }
    });
    const courses = response.data; // Extracting the data from the response
   
    return courses;
  } catch (error) {
    console.error(error);
    throw error;
  }
}



export async function getRecentUserCourses() {
  try {
    const id = localStorage.getItem('id')
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await fetch(apiUrl+`/Account/api/retrieve/course/${id}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Assuming JSON content type
        // Add other headers if needed
      }
    });
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
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await fetch(apiUrl+`/Account/api/student/sales/${id}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Assuming JSON content type
        // Add other headers if needed
      }
    });
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
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await fetch(apiUrl+'/Account/api/register/events/', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Assuming JSON content type
        // Add other headers if needed
      }
    });
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
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await fetch(apiUrl+`/Account/api/student/event/${id}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Assuming JSON content type
        // Add other headers if needed
      }
    });
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
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await fetch(apiUrl+'/Account/api/user/staff/', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Assuming JSON content type
        // Add other headers if needed
      }
    });
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
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await fetch(apiUrl+'/Account/api/user/student/', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Assuming JSON content type
        // Add other headers if needed
      }
    });
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
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await fetch(apiUrl+'/Account/api/user/sales/', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Assuming JSON content type
        // Add other headers if needed
      }
    });
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
    const accessTokenData = localStorage.getItem('accessToken');
    const token: string | null = accessTokenData ? JSON.parse(accessTokenData).token : null;
    const response = await fetch(apiUrl+`/Account/api/students/profile/${id}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Assuming JSON content type
        // Add other headers if needed
      }
    });
    if (!response.ok) {
      // Redirect to login page
      localStorage.removeItem("accessToken")
    }
    const profile = await response.json();
    // Assuming the response is an object with a 'profiles' property containing an array of profiles
    return profile;
  } catch (error) {
    console.error(error);
    throw error;
  }
}



