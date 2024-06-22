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
      component: "modules/Public/pages/Login",
    },
    {
      path: "/dashboard",
      component: "modules/users/",
      auth: true,
    }
  ];
  
  export default routes;
  