import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import jwtDecode from "jwt-decode";
import { api } from "src/boot/axios";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeEach((to, from) => {
    if (to.meta.requiresAuth) {
      // Verifica se há token salvo na session
      if (!localStorage.getItem("token")) {
        return { name: "portal" };
      }

      // Verifica se o userType é o mesmo exigido pela página
      if (to.meta.userType !== localStorage.getItem("userType")) {
        return { name: "ForbiddenAccess" };
      }
    } else {
      // Verifica se é usuário logado tentando voltar para página pública...
      if (localStorage.getItem("token")) {
        // Verifica o tipo do usuário logado e encaminha para sua home.
        if (localStorage.getItem("userType") === "professional") {
          return { name: "HomeProfessional" };
        }

        if (localStorage.getItem("userType") === "company") {
          return { name: "HomeCompany" };
        }
      }
    }
  });

  Router.beforeResolve(async (to) => {
    if (to.meta.requiresAuth) {
      try {
        if (!localStorage.getItem("token")) {
          return false;
        }
        const { exp } = jwtDecode(localStorage.getItem("token"));
        const isExpired = !!exp && Date.now() > exp * 300;

        if (isExpired) {
          await api
            .post("/token", {
              refreshToken: localStorage.getItem("refreshToken"),
            })
            .then((res) => {
              api.defaults.headers.common["Authorization"] = res.data.token;
              localStorage.setItem("token", res.data.token);
            })
            .catch((error) => {
              console.log("Router.beforeResolve() -> erros:", error);

              return false;
            });
        }
      } catch (error) {
        if (error instanceof NotAllowedError) {
          return false;
        } else {
          throw error;
        }
      }
    }
  });

  return Router;
});
