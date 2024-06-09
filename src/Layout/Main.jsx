import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Shared/NavBar';
import Footer from '../components/Shared/Footer';

const Main = () => {
  return (
    <div className="lg:w-screen w-11/12 mx-auto font-jost">
      <div className="w-full  ">
        <NavBar />
      </div>
      <div className="mt-auto   min-h-[calc(100vh-84px)]">
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
