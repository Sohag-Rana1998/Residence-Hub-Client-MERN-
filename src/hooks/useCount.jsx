import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useCount = (search, minPrice, maxPrice) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: count = 0,
    isPending,
    refetch: reload,
  } = useQuery({
    queryKey: ['get-count'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/count-properties?status=Verified&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      const count = data.count;
      // console.log(count);
      return count;
    },
  });
  return { count, isPending, reload };
};

export default useCount;
