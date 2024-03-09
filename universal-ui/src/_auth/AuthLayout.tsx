
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';


export default function AuthLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>

        <>
          <section className="flex flex-1  items-center flex-col py-10">
            <Outlet />
          </section>

          <img
            src="/assets/icons/svg-profilee.svg"
            alt="logo"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      
    </>
  );
}
