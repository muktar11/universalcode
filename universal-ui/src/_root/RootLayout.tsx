import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import  Navbar  from '@/components/shared/Navbar';
const RootLayout = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/sign-in');
    }
  }, [navigate]);

  return (
    <div className="w-full md:flex flex-col">
    <Topbar />
    <Navbar />
    <div className="flex flex-1 h-full">
      <LeftSidebar />
      <section className="flex-1">
        <Outlet />
      </section>
    </div>
    <Bottombar />
  </div>
    
  );
};

export default RootLayout;
