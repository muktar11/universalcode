export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type INewPost = {
  caption: string;
  imageUrl: URL;
  file: File[];
};

export type IUpdatePost = {
  _id: string;
  caption: string;
  imageUrl: URL;
  file: File[];
};

export type INewCourse = {
  Instructor: string;
  title: string;
  language: string;
  content: string;
  courseduration: string;
  streamingtime: string;
  startingday: string;
  endingday: string;
  file: File[];
};

export type INewEvent = {
  id: string;
  no_of_notifications: string; 
  title: string;
  startingtime: string;
  endtime: string;
  class_link: string;
  class_password: string;
  description: string;
  startingday: string;
  endingday: string;
  audience: string;
};

export type IUserEvent = {
  title: string;
  startingtime: string;
  endtime: string;
  class_link: string;
  class_password: string;
  description: string;
  startingday: string;
  endingday: string;
  audience: string;
};


export type IUpdateEvent = {
  id: string;
  title: string;
  startingtime: string;
  class_link: string;
  class_password: string;
  endtime: string;
  description: string;
  startingday: string;
  endingday: string;
  audience: string;
};


export type IPurchaseCourse = {
  courseId: string;
  userId: string;
};




export type IUpdateCourse = {
  _id: string;
  Instructor: string; // Added Instructor property
  title: string;
  language: string;
  content: string;
  courseduration: string;
  streamingtime: string;
  startingday: string;
  endingday: string;
  file: File[];
};



export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};



export type INewUser = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  password2: string;
  address: string;
  gender: string;
};


export type INewStaffUser = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  password2: string;
  address: string;
};



export type IPublishBookUser = {
  audience: string;
  caption: string;
  Book_imageUrl: File[];
};



export type IStaffUser = {
  _id: string;
  emailfield: string;
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

};


export type ISalesUser = {
  emailfield: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  birthday: string;
  mda_imageUrl: File[];
  photo_imageUrl: File[];
  terms_and_agreement_imageUrl: File[];

};




export type INewStudentUser = {
  sales_person_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  password2: string;
  address: string;
};


export type IUpdateStudentUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  birthday: string;
};


export type INewLoginUser = {
  email: string;
  password: string;
 
};

export type IUpdateProfilePic = {
  caption: string;
  file: File[];
}


export type IUpdatePassword = {
  email: string;
  new_password: string; 
  confirm_password: string;
}


export type INewProfile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  emailfield: string;
  imageId: string;
  imageUrl: URL;
  address: string;
  Program:string;
  Term: string;
  school_credentials_imageId: null,
  school_credentials_imageIdtwo: null,
  school_credentials_imageIdthree: null,
  school_credentials_imageUrl: URL;
  school_credentials_imageUrltwo: URL;
  school_credentials_imageUrlthree: URL;
  school_credentials_imagefile: File[];
  school_credentials_imagefiletwo: File[];
  school_credentials_imagefilethree: File[];
};

