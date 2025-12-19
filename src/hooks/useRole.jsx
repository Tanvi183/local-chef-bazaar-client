import React from "react";
import useAuth from "./useAuth";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { isLoading: roleLoading, data } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user.email}/role`);
      return res.data;
    },
  });

  return {
    role: data?.role || "user",
    status: data?.status || null,
    roleLoading,
  };
};

export default useRole;
