import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useVerifiedProperty = (currentPage, itemsPerPage, search) => {
  const axiosPublic = useAxiosPublic();
  const {
    data: verifiedProperties = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['verified-properties'],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/verified-properties?status=Verified&page=${currentPage}&size=${itemsPerPage}&search=${search}`
      );
      console.log(data);
      return data;
    },
  });
  return { verifiedProperties, isLoading, refetch };
};

export default useVerifiedProperty;
