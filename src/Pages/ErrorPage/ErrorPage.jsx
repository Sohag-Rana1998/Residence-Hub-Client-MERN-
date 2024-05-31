import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="min-h-screen w-screen flex justify-center items-center flex-col">
      <h3 className="text-5xl">404 Page</h3>
      <Link to={'/'}>
        <button className="btn bg-teal-200">Go Back Home</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
