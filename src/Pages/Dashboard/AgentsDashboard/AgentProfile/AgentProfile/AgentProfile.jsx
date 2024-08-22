import { useEffect } from "react";
import Profile from "../../../../../components/Shared/Profile";
import useRole from "../../../../../hooks/userRole";
import { Helmet } from "react-helmet-async";
import Loader from "../../../../../components/Shared/Loader";

const AgentProfile = () => {
  const { loggedUser, refetch, isPending } = useRole();
  // console.log(loggedUser);
  useEffect(() => {
    refetch();
  }, [refetch]);
  return isPending ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      <Helmet>
        <title>RESIDENCE HUB | Agent Profile</title>
      </Helmet>
      <Profile user={loggedUser} refetch={refetch} />
    </div>
  );
};

export default AgentProfile;
