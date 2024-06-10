import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useAllReviews = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: allReviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['reviews-for-slider'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/all-reviews');
      console.log(data);
      return data;
    },
  });
  return { allReviews, isLoading, refetch };
};

export default useAllReviews;
