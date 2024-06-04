import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
const usePropertyById = id => {
  const axiosSecure = useAxiosSecure();
  const {
    data: property = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['single-property'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/property/${id}`);
      console.log(data);
      return data;
    },
  });
  return { property, isLoading, refetch };
};

export default usePropertyById;
