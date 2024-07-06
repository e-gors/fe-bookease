import axios from "axios";

export const login = (params) => {
  return axios.post(`${process.env.REACT_APP_API_DOMAIN}/login`, params, {
    headers: {
      Accept: "application/json",
    },
  });
};

export const register = (params) => {
  return axios.post(`${process.env.REACT_APP_API_DOMAIN}/register`, params, {
    headers: {
      Accept: "application/json",
    },
  });
};
