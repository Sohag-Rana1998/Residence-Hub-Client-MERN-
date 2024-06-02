import Profile from '../../../../components/Shared/Profile';
import useRole from '../../../../hooks/userRole';

const AdminProfile = () => {
  const { loggedUser, refetch } = useRole();
  console.log(loggedUser);
  return (
    <div>
      <Profile user={loggedUser} refetch={refetch} />
    </div>
  );
};
export default AdminProfile;
