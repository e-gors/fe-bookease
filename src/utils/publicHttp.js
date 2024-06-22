import axios from "axios";

const publicHttp = axios.create();

publicHttp.defaults.baseURL = process.env.REACT_APP_API_DOMAIN;
publicHttp.defaults.headers.common["Accept"] = "application/json";
publicHttp.defaults.headers.common["Content-Type"] = "application/json";
publicHttp.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("clientToken")}`;

publicHttp.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.message === "Network Error") {
      return Promise.reject(error);
    }

    switch (error.response && error.response.status) {
      case 401:
        localStorage.removeItem("clientToken");
        window.location.href = "/";
        break;
      default:
        break;
    }

    return Promise.reject(error);
  }
);

export default publicHttp;
