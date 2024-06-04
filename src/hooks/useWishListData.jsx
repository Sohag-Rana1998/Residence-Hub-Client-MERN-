import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useWishListDataById = id => {
  const axiosSecure = useAxiosSecure();
  const {
    data: property = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['wishlistDataById'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/wishlist/${id}`);
      console.log(data);
      return data;
    },
  });
  return { property, isLoading, refetch };
};

export default useWishListDataById;
