import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useOfferedProperties = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: offeredProperties = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['offeredProperties'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/offered-properties');
      return data;
    },
  });

  return { offeredProperties, refetch, isLoading };
};

export default useOfferedProperties;
