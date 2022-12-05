import axios from "@/config/axios.js";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      isAuthenticated: false,
    };
  },
  actions: {
    googleSignUp() {
      axios.get("http://127.0.0.1:8000/api/auth/google").then((res) => {
        if (res.data.url) window.location.href = res.data.url;
      });
    },
    verifyEmail(id, hash) {
      axios.get(`http://127.0.0.1:8000/api/email/verify/${id}/${hash}`);
    },
  },
});
