import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
  sales_person_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  password2: z.string().min(8, { message: "Password must be at least 8 characters." }),
  address: z.string(),
  gender: z.string(),
});

export const SignupStaffValidation = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  bio: z.string(),
  birthday: z.string(),
  extracurricular: z.string(),
  mda_imageUrl :z.custom<File[]>(),
  photo_imageUrl : z.custom<File[]>(),
  school_credential_imageUrl: z.custom<File[]>(),
  terms_and_agreement_imageUrl: z.custom<File[]>(),
});

export const IUpdateCourseValidation = z.object({
  audience: z.string(),
  caption: z.string(),
  Book_imageUrl: z.custom<File[]>(),
})


export const UpdateStudentValidation = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  birthday: z.string(),
});



export const SignupSalesValidation = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  birthday: z.string(),
  mda_imageUrl :z.custom<File[]>(),
  photo_imageUrl : z.custom<File[]>(),
  terms_and_agreement_imageUrl: z.custom<File[]>(),
});
export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const UpdatePasswordValidation = z.object({
  email: z.string().email(),
  new_password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirm_password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  email: z.string().email(),
  bio: z.string(),
  first_name:z.string(),
  last_name: z.string(),
  phone:z.string(),
  gender: z.string(),
  emailfield:z.string(),
  address: z.string(),
  Program:z.string(),
  Term: z.string(),
  school_credentials_imagefile: z.custom<File[]>(),
  school_credentials_imagefiletwo: z.custom<File[]>(),
  school_credentials_imagefilethree: z.custom<File[]>(),
});


export const IUpdateProfilePicValidation = z.object({
  caption: z.string().min(0, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
});
// ============================================================
// POST

// ============================================================
export const PostValidation = z.object({
  caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
});



export const CourseValidation = z.object({
  Instructor: z.string(),
  title: z.string(),
  language: z.string(),
  content: z.string(),
  courseduration: z.string(),
  streamingtime: z.string(),
  startingday: z.string(),
  endingday: z.string(),
  file: z.custom<File[]>(),
});


export const EventValidation = z.object({
  title: z.string(),
  startingtime: z.string(),
  endtime: z.string(),
  description: z.string(),
  startingday: z.string(),
  endingday: z.string(),
  audience: z.string(),
  class_link: z.string(),
  class_password:z.string(),
});

