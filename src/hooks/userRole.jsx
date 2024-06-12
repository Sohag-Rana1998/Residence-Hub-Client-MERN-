import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  // console.log(user);
  const {
    data: loggedUser = {},
    refetch,
    isPending,
  } = useQuery({
    queryKey: ['userRole'],
    enabled: !loading,
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosSecure.get(
          `/logged-user-role?email=${user?.email}`
        );
        return data;
      }
    },
  });

  return { loggedUser, refetch, isPending };
};

export default useRole;
