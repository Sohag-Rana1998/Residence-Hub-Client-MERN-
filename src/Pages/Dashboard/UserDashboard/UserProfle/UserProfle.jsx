import { useEffect } from 'react';
import Profile from '../../../../components/Shared/Profile';

import useRole from '../../../../hooks/userRole';
import { Helmet } from 'react-helmet-async';

const UserProfle = () => {
  const { loggedUser, refetch } = useRole();
  console.log(loggedUser);
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <div>
      <Helmet>
        <title>RESIDENCE HUB | User Profile</title>
      </Helmet>
      <Profile user={loggedUser} refetch={refetch} />
    </div>
  );
};
export default UserProfle;
