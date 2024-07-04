const routes = [
  {
    path: "/",
    component: "pages/Homepage",
  },
  {
    path: "/register",
    component: "pages/Register",
  },
  {
    path: "/login",
    component: "pages/Login",
  },
  {
    path: "/dashboard",
    component: "pages/Dashboard",
    auth: true,
  },
  {
    path: "/blogs",
    component: "pages/Blog",
    auth: true,
  },
  {
    path: "/products",
    component: "pages/Products",
    auth: true,
  },
  {
    path: "/users",
    component: "pages/User",
    auth: true,
  },
];

export default routes;
