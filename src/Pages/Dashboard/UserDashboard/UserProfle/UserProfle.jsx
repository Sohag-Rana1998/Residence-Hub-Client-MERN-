import { useEffect } from 'react';
import Profile from '../../../../components/Shared/Profile';

import useRole from '../../../../hooks/userRole';

const UserProfle = () => {
  const { loggedUser, refetch } = useRole();
  console.log(loggedUser);
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <div>
      <Profile user={loggedUser} refetch={refetch} />
    </div>
  );
};
export default UserProfle;
