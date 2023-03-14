import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Create from "../pages/Create.vue";
import ViewWorkout from "../pages/ViewExcercise.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
  },
  {
    path: "/view-workout/:id",
    name: "View-workout",
    component: ViewWorkout,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
