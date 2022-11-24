import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/registration",
      name: "registration",
      component: () => import("../views/RegistrationView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/news-feed",
      name: "newsFeed",
      component: () => import("../views/NewsFeedView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/movies",
      name: "movies",
      component: () => import("../views/MoviesView.vue"),
    },
    {
      path: "/:catchAll(.*)",
      name: "notFound",
      component: () => import("../views/ForbiddenView.vue"),
    },
  ],
});

export default router;
