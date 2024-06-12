import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Shared/NavBar';
import Footer from '../components/Shared/Footer';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { useEffect, useState } from 'react';

const Main = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(setLoading, 500, false);
  }, []);
  return loading ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <ScaleLoader color="#36d7b7" height={80} width={5} />
    </div>
  ) : (
    <div className="w-screen  mx-auto font-jost">
      <div className="w-full mx-auto ">
        <NavBar />
      </div>
      <div className="mt-auto  min-h-[calc(100vh-84px)]">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
      <Toaster />
    </div>
  );
};

export default Main;
