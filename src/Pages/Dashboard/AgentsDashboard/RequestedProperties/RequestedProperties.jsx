/* eslint-disable no-unused-vars */
import toast from 'react-hot-toast';
import SectionTitle from '../../../../components/Shared/SectionTitle';

import Swal from 'sweetalert2';

import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useOfferedProperties from '../../../../hooks/useOfferedProperties';
import { Helmet } from 'react-helmet-async';
import ScaleLoader from 'react-spinners/ScaleLoader';

const RequestedProperties = () => {
  const { offeredProperties, refetch, isLoading } = useOfferedProperties();
  const axiosSecure = useAxiosSecure();
  const requestedProperties = offeredProperties?.filter(
    property => property.status !== 'Bought'
  );
  const { mutateAsync } = useMutation({
    mutationFn: async propertyStatus => {
      const { data } = await axiosSecure.patch(
        `/offered-property-action`,
        propertyStatus
      );
      return data;
    },
    onSuccess: data => {
      refetch();
      // console.log(data);
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

  const { mutateAsync: mutateAsync1 } = useMutation({
    mutationFn: async status1 => {
      const { data } = await axiosSecure.patch(`/offer-reject`, status1);
      return data;
    },
    onSuccess: data => {
      refetch();
      // console.log(data);
      Swal.fire({
        title: 'Updated!',
        text: 'Property Status Rejected successfully!',
        icon: 'success',
        confirmButton: false,
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const handleAcceptOffer = async (id, propertyId, buyerEmail) => {
    const propertyStatus = {
      id: id,
      propertyId: propertyId,
      buyerEmail: buyerEmail,
      status: 'Accepted',
    };
    // console.log(propertyStatus);
    Swal.fire({
      title: 'Are you sure?',
      text: `You want accept this offer!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await mutateAsync(propertyStatus);
        } catch (err) {
          // console.log(err);
          toast.error(err.message);
        }
      }
    });
  };
  const handleRejectOffer = async id => {
    const status = 'Rejected';

    const status1 = { status, id };
    Swal.fire({
      title: 'Are you sure?',
      text: `You want reject this offer!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await mutateAsync1(status1);
        } catch (err) {
          // console.log(err);
          toast.error(err.message);
        }
      }
    });
  };
  return isLoading ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <ScaleLoader color="#36d7b7" height={80} width={5} />
    </div>
  ) : (
    <div className="px-10 pb-10">
      <Helmet>
        <title>RESIDENCE HUB | Requested Properties</title>
      </Helmet>
      <div>
        <SectionTitle
          heading={'Requested Properties'}
          subheading={'Home/dashboard/Requested Properties'}
        />
      </div>
      <div>
        <div className="mt-5">
          <div className="overflow-x-auto">
            <table className="table ">
              {/* head */}

              <thead>
                <tr className="bg-blue-500 text-white rounded-t-3xl">
                  <th className=" ">No</th>

                  <th>Title</th>
                  <th> Location</th>
                  <th> Buyer Name</th>
                  <th> Buyer Email</th>
                  <th>Offered Price</th>
                  <th> Action</th>
                  <th> Action</th>
                </tr>
              </thead>

              <tbody>
                {/* row 1 */}
                {requestedProperties?.map((property, index) => (
                  <tr key={property._id}>
                    <td>{index + 1}</td>
                    <td>{property.title}</td>
                    <td>{property.location}</td>
                    <td>{property.buyerName}</td>
                    <td>{property.buyerEmail}</td>
                    <td>${property.OfferedAmount}</td>

                    {property.status === 'Pending' && (
                      <>
                        <td className="">
                          <button
                            onClick={() =>
                              handleAcceptOffer(
                                property._id,
                                property.propertyId,
                                property.buyerEmail
                              )
                            }
                            className="btn bg-blue-500 text-white"
                          >
                            Accept
                          </button>
                        </td>
                        <td className="">
                          <button
                            onClick={() => handleRejectOffer(property._id)}
                            className="btn bg-red-400 text-white"
                          >
                            Reject
                          </button>
                        </td>
                      </>
                    )}

                    {property.status === 'Accepted' && (
                      <td className="">
                        <span
                          className={`px-4 py-3 rounded-lg ${
                            property.status === 'Rejected'
                              ? 'bg-red-400'
                              : 'bg-blue-500'
                          }  text-white`}
                        >
                          {property.status}
                        </span>
                      </td>
                    )}
                    {property.status === 'Bought' && (
                      <td className="">
                        <span
                          className={`px-8 py-3 rounded-lg bg-blue-500 text-white`}
                        >
                          Sold
                        </span>
                      </td>
                    )}

                    {property.status === 'Rejected' && (
                      <td className="">
                        <span
                          className={`px-4 py-3 rounded-lg ${
                            property.status === 'Rejected'
                              ? 'bg-red-400'
                              : 'bg-blue-500'
                          }  text-white`}
                        >
                          {property.status}
                        </span>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestedProperties;
