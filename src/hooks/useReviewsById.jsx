import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
const useReviewsById = id => {
  const axiosSecure = useAxiosSecure();
  const {
    data: reviews = [],
    isLoading,
    refetch: reload,
  } = useQuery({
    queryKey: ['reviewsById'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reviews/${id}`);
      console.log(data);
      return data;
    },
  });
  return { reviews, isLoading, reload };
};

export default useReviewsById;
