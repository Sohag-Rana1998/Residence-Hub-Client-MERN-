import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Shared/NavBar';

const Main = () => {
  return (
    <div className="container mx-auto">
      <div>
        <NavBar />
      </div>
      <div style={{ height: 'calc(100vh - 84px' }} className="mt-auto">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
};

export default Main;
