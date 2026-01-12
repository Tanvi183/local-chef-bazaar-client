import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://local-chef-bazaar-server-flax.vercel.app/",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
