import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allReviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['allReviews'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/all-reviews');
      console.log(data);
      return data;
    },
  });
  return { allReviews, isLoading, refetch };
};

export default useAllReviews;
