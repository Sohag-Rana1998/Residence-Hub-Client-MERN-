import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';

const usePropertyByAgent = email => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    data: agentProperties = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['agentProperties', user?.email],
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosPublic.get(
          `/agent-properties?email=${user?.email}`
        );
        console.log(data);
        return data;
      }
    },
  });
  return { agentProperties, isLoading, refetch };
};

export default usePropertyByAgent;
