/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Vue from "vue";
import Router from "vue-router";
import auth from "@/auth/authService";
import store from "./store/store";

import firebase from "firebase/app";
import "firebase/auth";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: "",
      component: () => import("./layouts/main/Main.vue"),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: "/",
          redirect: "/dashboard/client"
        },
        {
          path: "/dashboard/appinfo",
          name: "dashboard-appinfo",
          component: () => import("./views/Dashboard.vue"),
          meta: {
            rule: "admin",
            requiresAuth: true
          }
        },
        {
          path: "/dashboard/client",
          name: "dashboard-client",
          component: () => import("./views/DashboardClient.vue"),
          meta: {
            rule: "admin",
            requiresAuth: true
          }
        },
        {
          path: "/dashboard/clientdescription",
          name: "dashboard-clientdescription",
          component: () => import("./views/DashboardClientDescription.vue"),
          meta: {
            rule: "admin",
            requiresAuth: true
          }
        },
        {
          path: "/dashboard/allcampaign",
          name: "dashboard-allcampaign",
          component: () => import("./views/DashboardCampaign.vue"),
          meta: {
            rule: "admin",
            requiresAuth: true
          }
        },
        {
          path: "/dashboard/addcampaigns",
          name: "dashboard-addcampaigns",
          component: () => import("./views/DashboardAddCampaigns.vue"),
          meta: {
            rule: "admin",
            requiresAuth: true
          }
        },
        {
          path: "/dashboard/viewstatus",
          name: "dashboard-viewstatus",
          component: () => import("./views/DashboardViewStatus.vue"),
          meta: {
            rule: "admin",
            requiresAuth: true
          },
          props: true
        },

        // =============================================================================
        // Settings
        // =============================================================================
        {
          path: "/settings/global-settings",
          name: "Global Settings",
          component: () => import("@/views/settings/GlobalSettings.vue"),
          meta: {
            rule: "admin",
            requiresAuth: true
          }
        },
        {
          path: "/settings/system-status",
          name: "System Status",
          component: () => import("@/views/settings/SystemStatus.vue"),
          meta: {
            rule: "admin",
            requiresAuth: true
          }
        },

        // =============================================================================
        // Users
        // =============================================================================\
        {
          path: "/users",
          name: "Users",
          component: () => import("@/views/users/Index.vue"),
          meta: {
            rule: "admin",
            requiresAuth: true
          }
        }
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: "",
      component: () => import("@/layouts/full-page/FullPage.vue"),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: "/callback",
          name: "auth-callback",
          component: () => import("@/views/Callback.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/login",
          name: "Login",
          component: () => import("@/views/Login.vue"),
          meta: {
            rule: "editor",
            requiresGuest: true
          }
        },
        {
          path: "/pages/register",
          name: "page-register",
          component: () => import("@/views/pages/register/Register.vue"),
          meta: {
            rule: "editor",
            requiresGuest: true
          }
        },
        {
          path: "/pages/forgot-password",
          name: "page-forgot-password",
          component: () => import("@/views/pages/ForgotPassword.vue"),
          meta: {
            rule: "editor",
            requiresGuest: true
          }
        },
        {
          path: "/pages/reset-password",
          name: "page-reset-password",
          component: () => import("@/views/pages/ResetPassword.vue"),
          meta: {
            rule: "editor",
            requiresGuest: true
          }
        },
        {
          path: "/pages/lock-screen",
          name: "page-lock-screen",
          component: () => import("@/views/pages/LockScreen.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/comingsoon",
          name: "page-coming-soon",
          component: () => import("@/views/pages/ComingSoon.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/error-404",
          name: "page-error-404",
          component: () => import("@/views/pages/Error404.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/error-500",
          name: "page-error-500",
          component: () => import("@/views/pages/Error500.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/not-authorized",
          name: "page-not-authorized",
          component: () => import("@/views/pages/NotAuthorized.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/maintenance",
          name: "page-maintenance",
          component: () => import("@/views/pages/Maintenance.vue"),
          meta: {
            rule: "editor"
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: "*",
      redirect: "/pages/error-404"
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.userRole === "editor" && to.name === "Users") {
      next("/");
    }
    if (!store.state.isLoggedIn) {
      next({
        name: "Login"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (!store.state.isLoggedIn) {
      next();
    } else {
      next("/");
    }
  }
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(() => {
    // get firebase current user
    const firebaseCurrentUser = firebase.auth().currentUser;

    // if (
    //     to.path === "/pages/login" ||
    //     to.path === "/pages/forgot-password" ||
    //     to.path === "/pages/error-404" ||
    //     to.path === "/pages/error-500" ||
    //     to.path === "/pages/register" ||
    //     to.path === "/callback" ||
    //     to.path === "/pages/comingsoon" ||
    //     (auth.isAuthenticated() || firebaseCurrentUser)
    // ) {
    //     return next();
    // }

    // If auth required, check login. If login fails redirect to login page
    if (to.meta.authRequired) {
      if (!(auth.isAuthenticated() || firebaseCurrentUser)) {
        router.push({ path: "/pages/login", query: { to: to.path } });
      }
    }

    return next();
    // Specify the current path as the customState parameter, meaning it
    // will be returned to the application after auth
    // auth.login({ target: to.path });
  });
});

export default router;
