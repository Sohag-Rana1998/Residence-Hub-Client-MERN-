import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAllReports = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allReports = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['allReports'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/all-reports');
      console.log(data);
      return data;
    },
  });
  return { allReports, isLoading, refetch };
};

export default useAllReports;
