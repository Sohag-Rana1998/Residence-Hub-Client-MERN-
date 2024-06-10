import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: properties = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['all-properties'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/properties');
      console.log(data);
      return data;
    },
  });
  return { properties, isLoading, refetch };
};

export default useAllProperties;
