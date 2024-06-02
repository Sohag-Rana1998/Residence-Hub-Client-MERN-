import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const usePropertyByAgent = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: wishlistProperties = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosSecure.get(
          `/properties?email=${user?.email}`
        );
        console.log(data);
        return data;
      }
    },
  });
  return { wishlistProperties, isLoading, refetch };
};

export default usePropertyByAgent;
