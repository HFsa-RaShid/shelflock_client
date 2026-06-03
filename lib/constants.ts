export const APP_NAME = "e-comfixter";

export const AUTH_ROUTES = {
  signin: "/signin",
  signup: "/signup",
  forgotPassword: "/forgot-password",
} as const;

export const ONBOARDING_ROUTES = {
  chooseRole: "/choose-role",
  setupBusiness: "/setup-business",
} as const;

export const STORE_SELECTION_ROUTES = {
  home: "/store-selection",
} as const;

export const DASHBOARD_ROUTES = {
  home: "/dashboard",
  settings: "/dashboard/settings",
} as const;

export const TEMPLATE_FLOW_ROUTES = {
  subscribe: "/subscribe",
  createStore: "/create-store",
} as const;
