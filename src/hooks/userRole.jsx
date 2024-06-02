import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: loggedUser,
    refetch,
    isPending,
  } = useQuery({
    queryKey: ['logged-user', user?.email],
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosSecure.get(`/user?email=${user?.email}`);
        return data;
      }
    },
  });

  return { loggedUser, refetch, isPending };
};

export default useRole;
