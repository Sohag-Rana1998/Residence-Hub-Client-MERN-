import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const usePropertyByAgent = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: agentProperties = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['agentProperties', user?.email],
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosSecure.get(
          `/agent-properties?email=${user?.email}`
        );
        // console.log(data);
        return data;
      }
    },
  });
  return { agentProperties, isLoading, refetch };
};

export default usePropertyByAgent;
