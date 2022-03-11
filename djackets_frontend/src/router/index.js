import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import HomeView from "../views/HomeView.vue";
import ProductView from "../views/ProductView.vue";
import CategoryView from "../views/CategoryView.vue";
import SearchView from "@/views/SearchView";
import CartView from "@/views/CartView";
import SignUpView from "@/views/SignUpView";
import LoginView from "@/views/LoginView";
import AccountView from "@/views/AccountView";
import CheckoutView from "@/views/CheckoutView";
import SuccessView from "@/views/SuccessView";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/:category_slug/:product_slug",
    name: "product",
    component: ProductView,
  },
  {
    path: "/:category_slug",
    name: "category",
    component: CategoryView,
  },
  {
    path: "/products/search",
    name: "search",
    component: SearchView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/account",
    name: "account",
    component: AccountView,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/cart/checkout",
    name: "checkout",
    component: CheckoutView,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/cart/success",
    name: "success",
    component: SuccessView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/products/search",
    name: "search",
    component: SearchView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requireLogin) &&
    !store.state.isAuthenticated
  ) {
    next({ name: "login", query: { to: to.path } });
  } else {
    next();
  }
});

export default router;
