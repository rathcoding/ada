import router from ".";

const routes = [
  {
    path: "/",
    name: "public",
    component: () => import("../layouts/PublicLayout.vue"),
    meta: { requiresAuth: false },
    children: [
      {
        path: "/",
        name: "portal",
        component: () => import("../pages/PortalPage.vue"),
      },
      {
        path: "/professional/login",
        name: "LoginProfessional",
        component: () => import("../pages/professional/LoginProfessional.vue"),
      },
      {
        path: "/professional/register",
        name: "RegisterProfessional",
        component: () =>
          import("../pages/professional/RegisterProfessional.vue"),
      },
      {
        path: "/company/login",
        name: "LoginCompany",
        component: () => import("../pages/company/LoginCompany.vue"),
      },
      {
        path: "/company/register",
        name: "RegisterCompany",
        component: () => import("../pages/company/RegisterCompany.vue"),
      },
    ],
  },

  {
    path: "/professional",
    name: "professional",
    component: () => import("../layouts/ProfessionalLayout.vue"),
    meta: { requiresAuth: true, userType: "professional" },
    children: [
      {
        path: "",
        name: "HomeProfessional",
        component: () => import("../pages/HomePage.vue"),
      },
      {
        path: "profile",
        name: "ProfileProfessional",
        component: () =>
          import("../pages/professional/ProfileProfessional.vue"),
      },
      {
        path: "resume",
        name: "ResumeProfessional",
        component: () => import("../pages/professional/ResumeProfessional.vue"),
      },
      {
        path: "jobs",
        name: "SearchJobProfessional",
        component: () =>
          import("../pages/professional/SearchJobProfessional.vue"),
      },
      {
        path: "match",
        name: "MatchProfessional",
        component: () => import("../pages/professional/MatchProfessional.vue"),
      },
      {
        path: "application",
        name: "ApplicationProfessional",
        component: () =>
          import("../pages/professional/ApplicationProfessional.vue"),
      },
    ],
  },

  {
    path: "/company",
    name: "company",
    component: () => import("../layouts/CompanyLayout.vue"),
    meta: { requiresAuth: true, userType: "company" },
    children: [
      {
        path: "",
        name: "HomeCompany",
        component: () => import("../pages/HomePage.vue"),
      },
      {
        path: "profile",
        name: "ProfileCompany",
        component: () => import("../pages/company/ProfileCompany.vue"),
      },
      {
        path: "jobs",
        name: "JobsCompany",
        component: () => import("../pages/company/JobsCompany.vue"),
      },
      {
        path: "job/manage",
        name: "ManageJobCompany",
        component: () => import("../pages/company/ManageJobCompany.vue"),
      },
      {
        path: "job/application",
        name: "ManageApplicationCompany",
        component: () =>
          import("../pages/company/ManageApplicationCompany.vue"),
      },
      {
        path: "professional",
        name: "SearchProfessionalCompany",
        component: () =>
          import("../pages/company/SearchProfessionalCompany.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },

  {
    path: "/:catchAll(.*)*",
    name: "ForbiddenAccess",
    component: () => import("pages/ForbiddenAccess.vue"),
  },
];

export default routes;
