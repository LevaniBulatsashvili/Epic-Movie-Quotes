import axios from "axios";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_BASE_URL + "/",
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
