import { Helmet } from 'react-helmet-async';
import Profile from '../../../../components/Shared/Profile';
import useRole from '../../../../hooks/userRole';

const AdminProfile = () => {
  const { loggedUser, refetch } = useRole();
  console.log(loggedUser);
  return (
    <div>
      <Helmet>
        <title>RESIDENCE HUB | Admin Profile</title>
      </Helmet>
      <Profile user={loggedUser} refetch={refetch} />
    </div>
  );
};
export default AdminProfile;
