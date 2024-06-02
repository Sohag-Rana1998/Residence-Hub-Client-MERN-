import { RiDeleteBin5Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import useAllUsers from '../../../../hooks/useAllUsers';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import SectionTitle from '../../../../components/Shared/SectionTitle';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { users, refetch } = useAllUsers();
  console.log(users);
  const { mutateAsync } = useMutation({
    mutationFn: async userRole => {
      const { data } = await axiosSecure.patch(`/users/role/${userRole.id}`, {
        role: userRole.role,
      });
      return data;
    },
    onSuccess: data => {
      refetch();
      console.log(data);
      Swal.fire({
        title: 'Updated!',
        text: 'User role updated successfully!',
        icon: 'success',
        confirmButton: false,
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const { mutateAsync: mutateAsync1 } = useMutation({
    mutationFn: async id => {
      const { data } = await axiosSecure.delete(`/user/${id}`);
      return data;
    },
    onSuccess: data => {
      refetch();
      console.log(data);

      Swal.fire({
        title: 'Deleted!',
        text: 'User Deleted successfully!',
        icon: 'success',
        confirmButton: false,
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const handleFraud = id => {
    console.log(id);
  };

  const handleChangeRole = async (id, role) => {
    const userRole = { id: id, role: role };
    console.log(userRole);
    Swal.fire({
      title: 'Are you sure?',
      text: `You want  to make him ${role}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await mutateAsync(userRole);
        } catch (err) {
          console.log(err);
          toast.error(err.message);
        }
      }
    });
  };

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        mutateAsync1(id);
      }
    });
  };

  return (
    <div className="w-full px-5 mt-5">
      <div>
        <SectionTitle
          heading={'Manage Users'}
          subheading={'Home/Dashboard/Manage Users'}
        />
      </div>
      <div className="w-full text-3xl mt-5 font-bold cinzel flex justify-evenly items-center">
        <div>All Users: </div>
        <div>Total Users: {users?.length}</div>
      </div>

      <div className="mt-5">
        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}

            <thead>
              <tr className="bg-blue-500 text-white rounded-t-3xl">
                <th className="p-5 ">No</th>

                <th>User Name</th>
                <th> User Email</th>
                <th> Role</th>
                <th> Make Admin</th>
                <th> Make Agent</th>
                <th> Mark as Fraud</th>
                <th> Delete</th>
              </tr>
            </thead>

            <tbody>
              {/* row 1 */}
              {users?.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>

                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user?.role || 'User'}</td>

                  <td className="">
                    <button
                      onClick={() => handleChangeRole(user._id, 'Admin')}
                      className="btn"
                    >
                      {' '}
                      Make Admin
                    </button>
                  </td>
                  <td className="">
                    <button
                      onClick={() => handleChangeRole(user._id, 'Agent')}
                      className="btn"
                    >
                      Make Agent
                    </button>
                  </td>
                  <td className="">
                    <button
                      onClick={() => handleFraud(user._id)}
                      className="btn"
                    >
                      Mark as Fraud
                    </button>
                  </td>
                  <th>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn bg-red-600 "
                    >
                      <RiDeleteBin5Line className="text-white text-xl" />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;