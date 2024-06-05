import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useVerifiedPropertiesForAdvertise = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: verifiedProperties = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['properties-to-advertise'],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/properties-to-advertise?status=Verified`
      );
      console.log(data);
      return data;
    },
  });
  return { verifiedProperties, isLoading, refetch };
};

export default useVerifiedPropertiesForAdvertise;
