import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useOfferedPropertyByEmail = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: offeredProperties = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['offeredProperties'],
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosSecure.get(
          `/bought-property?email=${user?.email}`
        );
        // console.log(data);
        return data;
      }
    },
  });
  return { offeredProperties, isLoading, refetch };
};

export default useOfferedPropertyByEmail;
