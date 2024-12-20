import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_URL,
  withCredentials: true,
});

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export default function useAxiosSecure() {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err?.status === 401 || err?.status === 403) {
          logOut().then(() => {
            navigate("/login");
          });
        }
      }
    );
  }, [navigate, logOut]);

  return axiosSecure;
}
