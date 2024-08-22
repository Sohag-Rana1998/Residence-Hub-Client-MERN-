import { Helmet } from "react-helmet-async";
import Profile from "../../../../components/Shared/Profile";
import useRole from "../../../../hooks/userRole";
import Loader from "../../../../components/Shared/Loader";

const AdminProfile = () => {
  const { loggedUser, refetch, isPending } = useRole();
  // console.log(loggedUser);

  return isPending ? (
    <div>
      <Loader />
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
