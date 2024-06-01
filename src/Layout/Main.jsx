import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Shared/NavBar';

const Main = () => {
  return (
    <div className="container mx-auto">
      <div>
        <NavBar />
      </div>
      <div className="pt-[62px]">
        {' '}
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
};

export default Main;
