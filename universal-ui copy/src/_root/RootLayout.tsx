import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Navbar from '@/components/shared/Navbar';
import styled from 'styled-components';

const RootLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const MainWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow-y: auto;
`;

const ContentWrapper = styled.section`
  flex: 1;
  padding: 20px; /* Adjust this based on your needs */
  overflow-y: auto;
`;

const RootLayout = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    // Handle search functionality here
  };
  

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/sign-in');
    }
  }, [navigate]);

  return (
    <RootLayoutWrapper>
     
      <Navbar  onSearch={handleSearch}/>
      <MainWrapper>
        <LeftSidebar />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </MainWrapper>
      <Bottombar />
    </RootLayoutWrapper>
  );
};

export default RootLayout;
