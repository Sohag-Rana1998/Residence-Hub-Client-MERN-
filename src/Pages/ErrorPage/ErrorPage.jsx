import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="min-h-screen  w-screen flex justify-center items-center flex-col">
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <div className="h-[530px]  mx-auto">
        <img
          className="h-full w-full mx-auto"
          src="https://i.postimg.cc/BQJZS932/404.png "
          alt=""
        />
      </div>
      <Link to={'/'}>
        <button className="btn bg-blue-500 text-white mb-5">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
