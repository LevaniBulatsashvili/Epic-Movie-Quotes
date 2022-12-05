import { useAuthStore } from "@/stores/auth";

const isAuthenticated = () => {
  const auth = useAuthStore();
  if (!auth.isAuthenticated) {
    return { name: "forbidden" };
  }
};

export default isAuthenticated;
