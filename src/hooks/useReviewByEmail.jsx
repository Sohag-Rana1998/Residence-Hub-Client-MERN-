import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useReviewByEmail = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: reviewData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['ReviewByEmail'],
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosSecure.get(`/reviews?email=${user?.email}`);
        console.log(data);
        return data;
      }
    },
  });
  return { reviewData, refetch, isLoading };
};

export default useReviewByEmail;
