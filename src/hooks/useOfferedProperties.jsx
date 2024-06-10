import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useOfferedProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: offeredProperties = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['offeredProperties'],
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosSecure.get(
          `/offered-properties?email=${user?.email}`
        );
        return data;
      }
    },
  });

  return { offeredProperties, refetch, isLoading };
};

export default useOfferedProperties;
