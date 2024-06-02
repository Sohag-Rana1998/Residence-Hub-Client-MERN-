import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const usePropertyByAgent = email => {
  const axiosPublic = useAxiosPublic();
  const {
    data: agentProperties = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['agentProperties'],
    queryFn: async () => {
      if (email) {
        const { data } = await axiosPublic.get(`/properties?email=${email}`);
        console.log(data);
        return data;
      }
    },
  });
  return { agentProperties, isLoading, refetch };
};

export default usePropertyByAgent;
