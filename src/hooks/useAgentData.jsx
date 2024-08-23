import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const useAgentData = (id) => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["Agent-Details"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/agent-data/${id}`);
      console.log(data);
      return data;
    },
  });
  return { data, isLoading, refetch };
};

export default useAgentData;
