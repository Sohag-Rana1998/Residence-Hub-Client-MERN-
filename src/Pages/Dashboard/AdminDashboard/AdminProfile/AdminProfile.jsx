import Profile from '../../../../components/Shared/Profile';
import useAuth from '../../../../hooks/useAuth';

const AdminProfile = () => {
  const { user } = useAuth();
  return (
    <div>
      <Profile user={user} />
    </div>
  );
};
export default AdminProfile;
