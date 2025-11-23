const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  NEW: "/new",
  MY_APPLICATIONS: "/my-applications",

  // User Dashboard
  DASHBOARD: "/dashboard",

  // Admin Dashboard
  ADMIN: "/admin",

  // Applications Management
  APPLICATIONS: {
    ALL: "/admin/applications",
    NEW_LOCAL: "/admin/applications/new-local",
    TYPES: "/admin/applications/types",
  },

  // License Management
  LICENSES: {
    ALL: "/admin/licenses",
    INTERNATIONAL: "/admin/licenses/international",
    DETAINED: "/admin/licenses/detained",
    CLASSES: "/admin/licenses/classes",
  },

  // Driver Management
  DRIVERS: {
    ALL: "/admin/drivers",
    ADD_NEW: "/admin/drivers/new",
  },

  // Testing
  TESTING: {
    APPOINTMENTS: "/admin/testing/appointments",
    TYPES: "/admin/testing/types",
    SCHEDULE: "/admin/testing/schedule",
  },

  // People Management
  PEOPLE: {
    ALL: "/admin/people",
    ADD_NEW: "/admin/people/new",
  },

  // Payments
  PAYMENTS: {
    HISTORY: "/admin/payments/history",
    METHODS: "/admin/payments/methods",
  },

  // System Settings
  SETTINGS: {
    LOCATIONS: "/admin/settings/locations",
    ACCOUNT: "/admin/settings/account",
  },
};

export default ROUTES;
