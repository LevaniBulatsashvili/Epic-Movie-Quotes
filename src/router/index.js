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
      path: "/news-feed/:modal?",
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
  if (to.name === "home") {
    document.title = "Epic Movie Quotes";
  } else {
    document.title = to.name
      .split(/(?=[A-Z])/)
      .map((a) => a.charAt(0).toUpperCase() + a.substr(1))
      .join(" ");
  }
  if (!auth.isAuthenticated) {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_API_BASE_URL + "/is-auth"
      );
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
