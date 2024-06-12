import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useSoldPropertiesByEmail = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: soldData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['soldDataByEmail'],
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosSecure.get(
          `/sold-properties?email=${user?.email}`
        );
        // console.log(data);
        return data;
      }
    },
  });
  return { soldData, refetch, isLoading };
};

export default useSoldPropertiesByEmail;
