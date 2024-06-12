import { useEffect } from 'react';
import Profile from '../../../../../components/Shared/Profile';
import useRole from '../../../../../hooks/userRole';
import { Helmet } from 'react-helmet-async';
import ScaleLoader from 'react-spinners/ScaleLoader';

const AgentProfile = () => {
  const { loggedUser, refetch,isPending } = useRole();
  // console.log(loggedUser);
  useEffect(() => {
    refetch();
  }, [refetch]);
  return  isPending ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <ScaleLoader color="#36d7b7" height={80} width={5} />
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
