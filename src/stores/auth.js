import axios from "@/config/axios.js";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      isAuthenticated: false,
      user: null,
    };
  },
  actions: {
    googleSignUp() {
      axios
        .get("http://127.0.0.1:8000/api/auth/google")
        .then((res) => {
          if (res.data.url) window.location.href = res.data.url;
        })
        .catch((err) => console.log(err));
    },
    verifyEmail(id, hash) {
      axios
        .get(`http://127.0.0.1:8000/api/email/verify/${id}/${hash}`)
        .catch((err) => console.log(err));
    },
    uploadImage(id, image) {
      axios
        .post(`http://127.0.0.1:8000/api/user/${id}/image-upload`, image)
        .then((res) => (this.user.thumbnail = res.data.thumbnail))
        .catch((err) => console.log(err));
    },
  },
});
