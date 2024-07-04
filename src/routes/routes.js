const routes = [
  {
    path: "/",
    component: "modules/Public/pages/Homepage",
  },
  {
    path: "/register",
    component: "modules/Public/pages/Register",
  },
  {
    path: "/login",
    component: "pages/Login",
  },
  {
    path: "/dashboard",
    component: "pages/App",
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
