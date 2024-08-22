import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Shared/NavBar";
import Footer from "../components/Shared/Footer";
import { useEffect, useState } from "react";
import Loader from "../components/Shared/Loader";

const Main = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(setLoading, 500, false);
  }, []);
  return loading ? (
    <div>
      <Loader />
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
