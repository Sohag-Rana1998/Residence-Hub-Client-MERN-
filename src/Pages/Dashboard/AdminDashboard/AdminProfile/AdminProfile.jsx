import { Helmet } from 'react-helmet-async';
import Profile from '../../../../components/Shared/Profile';
import useRole from '../../../../hooks/userRole';
import ScaleLoader from 'react-spinners/ScaleLoader';
const AdminProfile = () => {
  const { loggedUser, refetch, isPending } = useRole();
  // console.log(loggedUser);

  return isPending ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <ScaleLoader color="#36d7b7" height={80} width={5} />
    </div>
  ) : (
    <div>
      <Helmet>
        <title>RESIDENCE HUB | Admin Profile</title>
      </Helmet>
      <Profile user={loggedUser} refetch={refetch} />
    </div>
  );
};
export default AdminProfile;
