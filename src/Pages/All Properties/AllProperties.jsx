import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ScrollRestoration, useParams } from "react-router-dom";
import useVerifiedProperty from "../../hooks/useVerifiedProperty";
import Card from "../../components/Shared/Card";
import { useForm } from "react-hook-form";
import { FaFilter } from "react-icons/fa";
import useCount from "../../hooks/useCount";
import Loader from "../../components/Shared/Loader";

const AllProperties = () => {
  const { searchText } = useParams();
  // console.log(searchText);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [search, setSearch] = useState(searchText || "");
  const [loader, setLoader] = useState(false);
  const [modalLoading, setModalLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const { count, reload, isPending } = useCount(search, minPrice, maxPrice);
  // console.log(loader);
  const { verifiedProperties, refetch, isLoading } = useVerifiedProperty(
    currentPage,
    itemsPerPage,
    search,
    minPrice,
    maxPrice
  );

  useEffect(() => {
    setTimeout(setLoader, 1300, false);
  }, []);

  // console.log(count);

  const totalPage = Math.ceil(parseInt(count) / itemsPerPage);

  const pageArray = [...Array(totalPage).keys()].map((element) => element + 1);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoader(true);
    setMinPrice(0);
    setMaxPrice(0);
    const searchText = e.target.search.value;
    setSearch(searchText);
    setTimeout(refetch, 500);
    setTimeout(reload, 500);
    setTimeout(setLoader, 1000, false);
    e.target.reset();
  };

  // for review submission
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // handle Review
  const onSubmit = async (data) => {
    setLoader(true);
    setSearch("");
    setMinPrice(data.min_price);
    setMaxPrice(data.max_price);
    setTimeout(reload, 500);
    reset();
    setTimeout(setLoader, 1000, false);
  };

  return loader || isLoading || isPending ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div className=" w-full pt-[67px] ">
      <Helmet>
        <title>RESIDENCE HUB | All Property </title>
      </Helmet>
      <div>
        <div>
          <div className=" mb-5 h-48 bg-no-repeat bg-center bg-cover w-full  flex flex-col items-center justify-center bg-[url(https://i.postimg.cc/rmgxjThm/2.jpg)] bg-opacity-50 relative">
            <div className=" inset-0 absolute  bg-gradient-to-r from-gray-900 ">
              <div className="pl-4 p-5 max-w-7xl container mx-auto  mt-1 md:mt-10 text-center md:text-left">
                <h2 className=" text-2xl md:text-4xl font-bold text-white mb-2 md:mb-5">
                  Explore All Properties
                </h2>
                <p className="text-white">
                  Browse through our extensive collection <br /> of properties.
                  Use filters to find homes, apartments, and commercial spaces
                  that match your criteria.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-7xl container mx-auto">
            <div>
              <div className=" flex px-2 md:px-10 flex-col md:flex-row justify-between gap-3 items-center mx-auto w-full  mb-5  ">
                <div className="w-[90%] md:w-full">
                  <label
                    onClick={() => {
                      setModalLoading(false);
                      setTimeout(setModalLoading, 500, true);
                    }}
                    htmlFor="my_modal_7"
                    className="btn bg-blue-500 flex items-center w-full md:w-48 rounded-xl hover:bg-gray-500 text-white"
                  >
                    <FaFilter /> Filter By Price Range
                  </label>
                </div>
                <div className="flex justify-end w-[90%] md:w-full ">
                  <form onSubmit={handleSearch} className="w-full lg:w-[60%] ">
                    <label htmlFor="search"></label>
                    <div className="flex items-center gap-2">
                      <input
                        className="input bg-gray-200 w-full  border "
                        id="search"
                        name="search"
                        placeholder="Search By Location (USA)"
                        type="text"
                        required
                      />
                      <button className="btn md:w-24 py-[14px] px-4 rounded-lg hover:bg-gray-900 font-bold text-white bg-blue-500">
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1  px-5 py-5 rounded-md gap-5  md:grid-cols-2 lg:grid-cols-3 ">
              {verifiedProperties &&
                verifiedProperties.map((property) => (
                  <Card
                    key={property._id}
                    estate={property}
                    refetch={refetch}
                  />
                ))}
            </div>
            <div>
              {count > 3 ? (
                <div className="flex justify-center items-center text-white my-5 bg-blue-500 rounded-xl p-3">
                  <div className="flex">
                    <a
                      onClick={() => {
                        setCurrentPage(currentPage - 1);
                        setTimeout(refetch, 500);
                        setLoader(true);
                        setTimeout(setLoader, 1000, false);
                      }}
                      className={
                        currentPage == 1
                          ? " hidden"
                          : "px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md  dark:bg-gray-80 cursor-pointer hover:bg-blue-500 hover:text-white"
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

                    {pageArray?.map((page) => (
                      <button
                        onClick={() => {
                          setCurrentPage(page);
                          setTimeout(refetch, 500);
                          setLoader(true);
                          setTimeout(setLoader, 1000, false);
                        }}
                        key={page}
                        className={
                          currentPage == page
                            ? "px-4 py-2 hidden md:block mx-1 transition-colors duration-300 transform bg-gray-500 rounded-md sm:inline    hover:bg-blue-500   hover:text-white  "
                            : "px-4 py-2 hidden md:block mx-1 text-gray-700 transition-colors  duration-300 transform bg-white rounded-md sm:inline hover:bg-blue-500  hover:text-white  "
                        }
                      >
                        {page}
                      </button>
                    ))}

                    <a
                      className={
                        currentPage == pageArray.length
                          ? "hidden"
                          : "px-4 py-2 mx-1  text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
                      }
                      onClick={() => {
                        setCurrentPage(currentPage + 1);
                        setTimeout(refetch, 500);
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
                        {" "}
                        No Job Found
                      </h3>
                    ) : (
                      <></>
                    )}
                    <div className="w-full flex  justify-center">
                      <button
                        onClick={() => {
                          setSearch("");
                          setMinPrice(0);
                          setMaxPrice(0);
                          setTimeout(refetch, 500);
                          setTimeout(reload, 500);
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

          {/* Modal for Filter by Price */}
          <div className=" mx-auto h-auto w-full md:w-48">
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal  mx-auto" role="dialog">
              <div
                style={{
                  scrollbarWidth: "none",
                }}
                className="modal-box !p-2 !h-[380px] !w-80 right-0 absolute!"
              >
                {modalLoading ? (
                  <div>
                    <div>
                      {/* form */}
                      <div className="w-full ">
                        <div className="w-full  border rounded-md mt-5 p-5 shadow-md">
                          <h3 className="text-xl font-bold ">Price Range:</h3>
                          <div>
                            <form
                              onSubmit={handleSubmit(onSubmit)}
                              className=""
                            >
                              <div className="flex justify-between items-center">
                                <div className="mb-5">
                                  <label
                                    className="font-bold"
                                    htmlFor="min_price"
                                  >
                                    Minimum Price
                                  </label>
                                  <input
                                    id="min_price"
                                    name="min_price"
                                    type="number"
                                    {...register("min_price")}
                                    placeholder="Min-Price"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                                  />
                                  {errors.min_price && (
                                    <span className="text-red-500">
                                      This field is required
                                    </span>
                                  )}
                                </div>
                                <div className="mb-5">
                                  <label
                                    className="font-bold"
                                    htmlFor="max_price"
                                  >
                                    Maximum Price
                                  </label>
                                  <input
                                    id="max_price"
                                    name="max_price"
                                    type="number"
                                    placeholder="Max-Price"
                                    {...register("max_price")}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                                  />
                                  {errors.max_price && (
                                    <span className="text-red-500">
                                      This field is required
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="mt-6">
                                <button className="modal-action w-full flex justify-center  p-3">
                                  <label
                                    htmlFor="my_modal_7"
                                    className="btn w-full flex justify-center  bg-blue-500 text-white hover:bg-gray-800"
                                  >
                                    Apply
                                  </label>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="w-full flex justify-end mt-2">
                          <label htmlFor="my_modal_7" className="btn">
                            Cancel
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full  flex justify-center items-center">
                    <span className="loading loading-spinner loading-lg"></span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default AllProperties;
