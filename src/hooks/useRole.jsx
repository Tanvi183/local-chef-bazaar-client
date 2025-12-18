import React from "react";
import useAuth from "./useAuth";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { isLoading: roleLoading, data } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user.email}/role`);
      return res.data.role;
    },
  });

  const role = data || "user";

  return { role, roleLoading };
};

export default useRole;
