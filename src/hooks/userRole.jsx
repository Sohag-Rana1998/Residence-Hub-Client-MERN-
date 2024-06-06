import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';

const useRole = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  console.log(user);
  const {
    data: loggedUser = {},
    refetch,
    isPending,
  } = useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosPublic.get(
          `/logged-user-role?email=${user?.email}`
        );
        return data;
      }
    },
  });

  return { loggedUser, refetch, isPending };
};

export default useRole;
