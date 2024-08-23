import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useVerifiedProperty = (
  currentPage,
  itemsPerPage,
  search,
  minPrice,
  maxPrice
) => {
  const axiosSecure = useAxiosSecure();
  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["verified-properties"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/verified-properties?status=Verified&page=${currentPage}&size=${itemsPerPage}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      // console.log(data);
      return data;
    },
  });
  return { data, isLoading, refetch };
};

export default useVerifiedProperty;
