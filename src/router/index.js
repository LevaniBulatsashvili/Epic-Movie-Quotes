import axios from "axios";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import isAuthenticated from "./guards";

axios.defaults.withCredentials = true;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:modal?/:data?/:hash?",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/news-feed",
      name: "newsFeed",
      component: () => import("@/views/NewsFeedView.vue"),
      beforeEnter: isAuthenticated,
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/ProfileView.vue"),
      beforeEnter: isAuthenticated,
    },
    {
      path: "/movies",
      name: "movies",
      component: () => import("@/views/MoviesView.vue"),
      beforeEnter: isAuthenticated,
    },
    {
      path: "/forbidden",
      name: "forbidden",
      component: () => import("@/views/ForbiddenView.vue"),
    },
    {
      path: "/:catchAll(.*)",
      name: "notFound",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  if (!auth.isAuthenticated) {
    try {
      await axios.get("http://127.0.0.1:8000/api/is-auth");
      auth.isAuthenticated = true;
    } catch (err) {
      auth.isAuthenticated = false;
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return next();
    }
  }
  return next();
});

export default router;
