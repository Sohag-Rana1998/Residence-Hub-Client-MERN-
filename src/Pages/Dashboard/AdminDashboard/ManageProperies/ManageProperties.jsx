import toast from 'react-hot-toast';
import SectionTitle from '../../../../components/Shared/SectionTitle';
import useAllProperties from '../../../../hooks/useAllProperties';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';

const ManageProperties = () => {
  const { properties, refetch, isLoading } = useAllProperties();
  const axiosSecure = useAxiosSecure();

  const { mutateAsync } = useMutation({
    mutationFn: async propertyStatus => {
      const { data } = await axiosSecure.patch(
        `/property/status/${propertyStatus.id}`,
        {
          status: propertyStatus.status,
        }
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

  const handleStatus = async (id, status) => {
    const propertyStatus = { id: id, status: status };
    console.log(propertyStatus);
    Swal.fire({
      title: 'Are you sure?',
      text: `You want  to set status ${status}!`,
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
          console.log(err);
          toast.error(err.message);
        }
      }
    });
  };
  return (
    <div>
      <div>
        <SectionTitle
          heading={'Manage Properties'}
          subheading={'Home/dashboard/ManageProperties'}
        />
      </div>
      <div>
        <div className="mt-5">
          <div className="overflow-x-auto">
            <table className="table ">
              {/* head */}

              <thead>
                <tr className="bg-blue-500 text-white rounded-t-3xl">
                  <th className="p-5 ">No</th>

                  <th>Title</th>
                  <th> Location</th>
                  <th> Agent Name</th>
                  <th> Agent Email</th>
                  <th> Price Range</th>
                  <th> Verify Action</th>
                  <th> Reject Action</th>
                </tr>
              </thead>

              <tbody>
                {/* row 1 */}
                {properties?.map((property, index) => (
                  <tr key={property._id}>
                    <th>{index + 1}</th>

                    <td>{property.title}</td>
                    <td>{property.location}</td>
                    <td>{property.agentName}</td>
                    <td>{property.agentEmail}</td>
                    <td>
                      ${property.minimumPrice}-{property.maximumPrice}
                    </td>
                    {property.status === 'Verified' ||
                    property.status === 'Rejected' ? (
                      <td className="">
                        <button className="btn bg-blue-500 text-white">
                          {property.status}
                        </button>
                      </td>
                    ) : (
                      <>
                        <td className="">
                          <button
                            onClick={() =>
                              handleStatus(property._id, 'Verified')
                            }
                            className="btn bg-blue-500 text-white"
                          >
                            Verify
                          </button>
                        </td>
                        <td className="">
                          <button
                            onClick={() =>
                              handleStatus(property._id, 'Rejected')
                            }
                            className="btn bg-red-400"
                          >
                            Reject
                          </button>
                        </td>
                      </>
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

export default ManageProperties;
