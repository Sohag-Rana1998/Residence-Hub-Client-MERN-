import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useAdvertiseProperties = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: advertisedProperties = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['advertised-properties'],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/advertised-properties?status=Advertised`
      );
      // console.log(data);
      return data;
    },
  });
  return { advertisedProperties, isLoading, refetch };
};

export default useAdvertiseProperties;
