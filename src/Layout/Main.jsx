import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Shared/NavBar';

const Main = () => {
  return (
    <div className=" mx-auto font-jost">
      <div>
        <NavBar />
      </div>
      <div className="mt-auto   min-h-[calc(100vh-84px)]">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
};

export default Main;
