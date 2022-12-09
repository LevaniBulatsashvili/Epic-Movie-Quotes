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
      path: "/movies/add-movie",
      name: "addMovie",
      component: () => import("@/views/MoviesView.vue"),
      beforeEnter: isAuthenticated,
    },
    {
      path: "/movies/:id",
      name: "movieDescription",
      component: () => import("@/views/MovieDescriptionView.vue"),
      beforeEnter: isAuthenticated,
    },
    {
      path: "/movies/:id/edit-movie",
      name: "editMovie",
      component: () => import("@/views/MovieDescriptionView.vue"),
      beforeEnter: isAuthenticated,
    },
    {
      path: "/movies/:id/quotes/:quoteId",
      name: "viewQuote",
      component: () => import("@/views/MovieDescriptionView.vue"),
      beforeEnter: isAuthenticated,
    },
    {
      path: "/movies/:id/add-quote",
      name: "addQuote",
      component: () => import("@/views/MovieDescriptionView.vue"),
      beforeEnter: isAuthenticated,
    },
    {
      path: "/movies/:id/quotes/:quoteId/edit-quote",
      name: "editQuote",
      component: () => import("@/views/MovieDescriptionView.vue"),
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
      const res = await axios.get("http://127.0.0.1:8000/api/is-auth");
      // console.log(res.data.user);
      if (!auth.isAuthenticated) {
        auth.isAuthenticated = true;
        auth.user = res.data.user;
      }
    } catch (err) {
      auth.isAuthenticated = false;
      auth.user = null;
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return next();
    }
  }
  return next();
});

export default router;
