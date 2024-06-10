import { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet-async';
import { ScrollRestoration } from 'react-router-dom';
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

// import { GrLinkNext } from 'react-icons/gr';
import useVerifiedProperty from '../../../../hooks/useVerifiedProperty';

import SectionTitle from '../../../../components/Shared/SectionTitle';
import useRole from '../../../../hooks/userRole';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { MdVerified } from 'react-icons/md';

const AdvertiseProperty = () => {
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
    e.target.reset();
  };

  const { mutateAsync } = useMutation({
    mutationFn: async propertyData => {
      const { data } = await axiosSecure.patch(
        `/advertise-property`,
        propertyData
      );
      return data;
    },
    onSuccess: data => {
      refetch();
      console.log(data);
      Swal.fire({
        title: 'Updated!',
        text: 'Property Status updated successfully!',
        icon: 'success',
        confirmButton: false,
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const handleAdvertise = id => {
    const propertyData = { id, advertise: 'Advertised' };
    console.log(propertyData);
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to Advertise this property!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await mutateAsync(propertyData);
        } catch (err) {
          console.log(err);
          toast.error(err.message);
        }
      }
    });
  };

  return isLoading || loader ? (
    <div className="w-[80%] mx-auto min-h-screen ">
      {/* <SkeletonTheme baseColor="#a2a2b2">
        <div>
          <div className="mt-10 mb-5">
            <Skeleton height={150} />
          </div>

          <Skeleton height={30} count={10} />
        </div>
      </SkeletonTheme> */}
    </div>
  ) : (
    <div className=" container mx-auto px-10 pb-10">
      <Helmet>
        <title>RESIDENCE HUB | Advertise Properties</title>
      </Helmet>
      <div>
        <div>
          <div className="">
            <SectionTitle
              heading={'Advertise Property'}
              subheading={'Home/Dashboard/Advertise Properties'}
            />
          </div>

          <div>
            <div>
              <div className=" w-[80%] mx-auto md:w-full block md:flex mb-5  md:justify-end ">
                <form onSubmit={handleSearch}>
                  <label htmlFor="search"></label>
                  <input
                    className="input bg-gray-200 w-full md:w-72 border  mr-3"
                    id="search"
                    name="search"
                    placeholder="Search By Property Location (USA)"
                    type="text"
                    required
                  />
                  <button className="btn w-full md:w-40 py-[14px] px-4 rounded-lg hover:bg-gray-900 font-bold text-white bg-blue-500">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
          {verifiedProperties && verifiedProperties.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table ">
                {/* head */}
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th>No:</th>
                    <th>Property Image</th>
                    <th>Property Title</th>
                    <th>Price Range</th>
                    <th>Agent Name</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {/* row 1 */}
                  {verifiedProperties &&
                    verifiedProperties?.map((property, index) => (
                      <tr key={index} className="bg-base-200">
                        <th>{index + 1}</th>

                        <td>
                          <img
                            className="w-32 h-24 rounded-xl"
                            src={property?.image}
                            alt=""
                          />
                        </td>
                        <td>{property?.title}</td>

                        <td>
                          ${property?.minimumPrice}-{property?.maximumPrice}
                        </td>
                        <td>{property.agentName}</td>

                        <td>
                          {property?.advertise === 'Advertised' ? (
                            <span className="bg-blue-500 flex items-center justify-center gap-1 font-bold px-5 py-[14px]  rounded-3xl text-white">
                              Advertised <MdVerified />
                            </span>
                          ) : (
                            <button
                              onClick={() => {
                                handleAdvertise(property._id);
                                setTimeout(refetch, 500);
                              }}
                              className="btn w-40 rounded-3xl bg-gray-500 text-white"
                            >
                              Advertise
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table ">
                {/* head */}
                <thead>
                  <tr>
                    <th>No:</th>
                    <th>Property Image</th>
                    <th>Property Title</th>
                    <th>Price Range</th>
                    <th>Agent Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}

                  <tr className="bg-base-200">
                    <th></th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <div className=" mt-5 mb-10 md:mb-40  font-bold">
                <h3 className="text-center mb-10 text-3xl"> No Data Found</h3>
                <div className="w-full flex justify-end my-5">
                  <button
                    onClick={() => {
                      setSearch('');
                      setTimeout(refetch, 300);
                    }}
                    className="btn bg-gray-500 text-white text-right"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        {verifiedProperties && parseInt(count) > 4 ? (
          <div className="flex justify-center overflow-y-auto items-center my-5 bg-blue-500 rounded-xl p-3">
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
                    : 'px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md  dark:bg-gray-80 cursor-pointer dark:text-gray-600'
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
                    setLoader(true);
                    setTimeout(refetch, 300);
                    setTimeout(setLoader, 1000, false);
                  }}
                  key={page}
                  className={
                    currentPage == page
                      ? 'px-4 py-2 hidden md:block mx-1 text-gray-700 transition-colors duration-300 transform bg-blue-500 rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200'
                      : 'px-4 hidden md:block py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200'
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
            <div className="w-full flex justify-end my-5">
              <button
                onClick={() => {
                  setSearch('');
                  setLoader(true);
                  setTimeout(refetch, 500);
                  setTimeout(setLoader, 500, false);
                }}
                className="btn bg-gray-500 text-white text-right"
              >
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default AdvertiseProperty;
