// routes.js or router.js

import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import RegisterUser from "@/pages/RegisterUser.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/register/user",
    component: RegisterUser,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
