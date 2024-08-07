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
    path: "/complete-registration",
    component: "pages/CompleteRegistration",
  },
  {
    path: "/verify-email",
    component: "pages/VerifyEmail",
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
    path: "/categories",
    component: "pages/Categories",
    auth: true,
  },
  {
    path: "/services",
    component: "pages/Services",
    auth: true,
  },
  {
    path: "/appointments",
    component: "pages/Appointments",
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
