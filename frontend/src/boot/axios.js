import { boot } from "quasar/wrappers";
import axios from "axios";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: "http://localhost:5000",
});

// api.interceptors.response.use(
//   (response) => {
//     console.log(response);
//     return response;
//   },
//   async (error) => {
//     console.log(error);
//     const config = error?.config;
//     console.log("interceptors");
//     if (error?.response?.status === 401 && !config?.sent) {
//       config.sent = true;

//       await api
//         .post("/token", {
//           refreshToken: localStorage.getItem("refreshToken"),
//         })
//         .then((res) => {
//           console.log("refreshToken() -> res:", res);
//           localStorage.setItem("token", res.data.token);
//           config.headers = {
//             ...config.headers,
//             authorization: res.data.token,
//           };
//           return axios(config);
//         })
//         .catch((error) => {
//           console.log("refreshToken() -> erros:", error);
//           const userType = localStorage.getItem("userType");
//           localStorage.removeItem("token");
//           localStorage.removeItem("refreshToken");
//           localStorage.removeItem("userType");
//           window.location.href =
//             userType === "professional"
//               ? "http://localhost:8080/professional/login"
//               : "http://localhost:8080/company/login";
//           return false;
//         });
//     }
//     return Promise.reject(error);
//   }
// );

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
