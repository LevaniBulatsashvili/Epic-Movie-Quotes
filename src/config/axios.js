import axios from "axios";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 15000,
});

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      const auth = useAuthStore();
      auth.isAuthenticated = false;
      router.push({ name: "forbidden" });
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
