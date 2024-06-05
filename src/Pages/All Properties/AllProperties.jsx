import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ScrollRestoration } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useVerifiedProperty from '../../hooks/useVerifiedProperty';
import Card from '../../components/Shared/Card';
import useRole from '../../hooks/userRole';

const AllProperties = () => {
  const { loggedUser, isPending } = useRole();
  console.log(loggedUser);
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [search, setSearch] = useState('');
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const { verifiedProperties, refetch, isLoading } = useVerifiedProperty(
    currentPage,
    itemsPerPage,
    search
  );

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosSecure.get(
        `/count-properties?status=Verified&search=${search}`
      );

      if (data) {
        setCount(data.count);
      }
    };
    getCount();
    setLoader(true);
    setTimeout(setLoader, 1000, false);
  }, [search, axiosSecure]);
  console.log(count);

  const totalPage = Math.ceil(parseInt(count) / itemsPerPage);

  const pageArray = [...Array(totalPage).keys()].map(element => element + 1);

  const handleSearch = async e => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearch(searchText);
    setTimeout(refetch, 500);
  };

  return (
    <div className="container mx-auto  pt-12 ">
      <Helmet>
        <title>Heaven Residence | All Property </title>
      </Helmet>
      <div className="mt-10">
        <div>
          <div className=" mb-5 rounded-t-xl h-60 bg-no-repeat bg-center bg-cover w-full  flex flex-col items-center justify-center bg-[url(https://i.postimg.cc/rstCStvL/banner-job-ads-1.jpg)] bg-opacity-50 relative">
            <div className=" inset-0 absolute rounded-t-xl bg-gradient-to-r from-gray-900 ">
              <div className="pl-0 p-5  md:pl-20 mt-1 md:mt-10 text-center md:text-left">
                <h2 className=" text-2xl md:text-4xl font-bold text-white mb-2 md:mb-5">
                  Explore All Properties
                </h2>
                <p className="text-white">
                  Unleash your potential on our job portal. Find tailored
                  opportunities, connect with top employers, <br /> and elevate
                  your career. Your next big opportunity awaits. Explore today!
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className=" w-[80%] mx-auto md:w-full block md:flex mb-5  md:justify-end ">
              <form onSubmit={handleSearch}>
                <label htmlFor="search"></label>
                <input
                  className="input bg-gray-200 w-full md:w-60 border mb-5 mr-3"
                  id="search"
                  name="search"
                  placeholder="Search By Job Title"
                  type="text"
                  required
                />
                <button className="btn w-full md:w-40 py-[14px] px-4 rounded-lg hover:bg-gray-900 font-bold text-white bg-blue-500">
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="grid grid-cols-1  px-10 py-5 rounded-md gap-5  md:grid-cols-2 lg:grid-cols-3 ">
            {verifiedProperties &&
              verifiedProperties.map(property => (
                <Card key={property._id} estate={property} refetch={refetch} />
              ))}
          </div>
          <div>
            {count > 4 ? (
              <div className="flex justify-center items-center text-white my-5 bg-blue-500 rounded-xl p-3">
                <div className="flex">
                  <a
                    onClick={() => {
                      setCurrentPage(currentPage - 1);
                      setTimeout(refetch, 300);
                      setLoader(true);
                      setTimeout(setLoader, 1000, false);
                    }}
                    className={
                      currentPage == 1
                        ? ' hidden'
                        : 'px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md  dark:bg-gray-80 cursor-pointer hover:bg-blue-500 hover:text-white'
                    }
                  >
                    <div className="flex items-center -mx-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-1 rtl:-scale-x-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16l-4-4m0 0l4-4m-4 4h18"
                        />
                      </svg>

                      <span className="mx-1">Previous Page</span>
                    </div>
                  </a>

                  {pageArray?.map(page => (
                    <button
                      onClick={() => {
                        setCurrentPage(page);
                        setTimeout(refetch, 300);
                        setLoader(true);
                        setTimeout(setLoader, 1000, false);
                      }}
                      key={page}
                      className={
                        currentPage == page
                          ? 'px-4 py-2 hidden md:block mx-1 transition-colors duration-300 transform bg-gray-500 rounded-md sm:inline    hover:bg-blue-500   hover:text-white  '
                          : 'px-4 py-2 hidden md:block mx-1 text-gray-700 transition-colors  duration-300 transform bg-white rounded-md sm:inline hover:bg-blue-500  hover:text-white  '
                      }
                    >
                      {page}
                    </button>
                  ))}

                  <a
                    className={
                      currentPage == pageArray.length
                        ? 'hidden'
                        : 'px-4 py-2 mx-1  text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200'
                    }
                    onClick={() => {
                      setCurrentPage(currentPage + 1);
                      setTimeout(refetch, 300);
                      setLoader(true);
                      setTimeout(setLoader, 1000, false);
                    }}
                  >
                    <div className="flex items-center cursor-pointer -mx-1">
                      <span className="mx-1">Next Page</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-1 rtl:-scale-x-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <div className="w-full flex flex-col justify-center mt-5">
                  {verifiedProperties && verifiedProperties.length === 0 ? (
                    <h3 className="text-center text-3xl font-bold my-10">
                      {' '}
                      No Job Found
                    </h3>
                  ) : (
                    <></>
                  )}
                  <div className="w-full flex  justify-center">
                    <button
                      onClick={() => {
                        setSearch('');
                        setTimeout(refetch, 300);
                        setLoader(true);
                        setTimeout(setLoader, 1000, false);
                      }}
                      className="btn w-[40] bg-blue-500 text-white text-right mb-5"
                    >
                      See All Property
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default AllProperties;
