import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignupView.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const isAuthChecked = store.getters["isAuthChecked"];
  const isAuth = store.getters["isAuthenticated"]

  if (!isAuthChecked) {
    await store.dispatch("listenToAuthChanges");
  }
  if (to.meta.requiresAuth && !isAuth) {
    next("/login");
  } else {
    next();
  }
});

export default router;
