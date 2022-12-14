import axios from "@/config/axios.js";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      isAuthenticated: false,
      user: null,
      notifications: sessionStorage.getItem("notifications")
        ? JSON.parse(sessionStorage.getItem("notifications"))
        : [],
    };
  },
  actions: {
    googleSignUp() {
      axios
        .get(import.meta.env.VITE_BACKEND_API_BASE_URL + "/auth/google")
        .then((res) => {
          if (res.data.url) window.location.href = res.data.url;
        })
        .catch((err) => console.log(err));
    },
    verifyEmail(id, hash) {
      axios
        .get(
          import.meta.env.VITE_BACKEND_API_BASE_URL +
            `/email/verify/${id}/${hash}`
        )
        .catch((err) => console.log(err));
    },
    uploadImage(id, image) {
      axios
        .post(
          import.meta.env.VITE_BACKEND_API_BASE_URL +
            `/user/${id}/image-upload`,
          image
        )
        .then((res) => (this.user.thumbnail = res.data.thumbnail))
        .catch((err) => console.log(err));
    },
  },
});
