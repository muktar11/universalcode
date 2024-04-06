import { Routes, Route,Navigate } from 'react-router-dom';
import {
  Home,
  HomeCourse,
  CreatePost,
  CreateCourse,
  CreateStaff,
  CreateBook,
  CreateSales,
  EventsForm,
  HomeEvents,
  MyHomeEvents,
  HomeProfile,
  HomeTable,
  HomeSales,
  MyHomeCourse,
  HomeStaff,
  EditCourse,
  SingleCourse,
  EditHome,
  EventsEdits,
  SalesStudentsTable,
  Books,
} from "@/_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SignupForm from "@/_auth/forms/SignupForm";
import SigninForm from "@/_auth/forms/SigninForm";
import { Toaster } from "@/components/ui/toaster";


import "./globals.css";
const App = () => {

  return (
    <main className="flex h-screen">
      <Routes>

        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        
        </Route>

        {/* private routes */}
       
        <Route element={<RootLayout />}>
          <Route index element={<Home/>} />
          <Route path="/explore" element={<HomeCourse />} />
          <Route path="/my-students" element={<HomeTable action={'Create'}  />} />
          <Route path="/sales-students" element={<SalesStudentsTable action={'Create'}  />} />
          <Route path="/books" element={<Books />} />
          <Route path="/course-books" element={<CreateBook />} />
          <Route path="/my-sales" element={<HomeSales  />} />
          <Route path="/my-event" element={<MyHomeEvents />} />
          <Route path="/Home-staff" element={<HomeStaff  />} /> 
          <Route path="/events" element={<EventsForm />} />
          <Route path="/event" element={<HomeEvents />} />
          <Route path="/courses" element={<MyHomeCourse/>} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/access-course" element={<EditCourse />} />
          <Route path="/edit-course/:_id" element={<SingleCourse/>} />

          <Route path="/access-post" element={<EditHome />} />
          <Route path="/access-events" element={<EventsEdits/>} />

          <Route path="/create-staff" element={<CreateStaff />} />
          <Route path="/create-sales" element={<CreateSales />} />
          <Route path="/profile/" element={<HomeProfile/>} />

          <Route path="*" element={<Navigate to="/sign-in" />} />
    
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
