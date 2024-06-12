import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useOfferedPropertyById = id => {
  // console.log('hook', id);
  const axiosSecure = useAxiosSecure();
  const {
    data: acceptedProperty = [],
    isLoading,
    refetch: reload,
  } = useQuery({
    queryKey: ['payment-property-ById'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payment-property/${id}`);
      // console.log(data);
      return data;
    },
  });
  return { acceptedProperty, isLoading, reload };
};

export default useOfferedPropertyById;
