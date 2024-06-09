import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useAgents = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: allAgents = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['all-agents'],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/agents?role=Agent`);
      console.log(data);
      return data;
    },
  });
  return { allAgents, isLoading, refetch };
};

export default useAgents;
