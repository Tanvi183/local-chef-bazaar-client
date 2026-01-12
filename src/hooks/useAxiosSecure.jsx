import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const instance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://local-chef-bazaar-server-flax.vercel.app",
});

const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // REQUEST INTERCEPTOR
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // RESPONSE INTERCEPTOR
    const responseinterceptor = instance.interceptors.response.use(
      (res) => res,
      (err) => {
        // console.log(err);
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          console.log("log out the user for bad request");
          signOutUser().then(() => {
            localStorage.removeItem("token");
            navigate("/register");
          });
        }
        return Promise.reject(err);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.request.eject(responseinterceptor);
    };
  }, [signOutUser, navigate]);

  return instance;
};

export default useAxiosSecure;
