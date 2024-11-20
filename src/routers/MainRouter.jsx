import { createBrowserRouter } from "react-router-dom";

import OnboardingPage from "../pages/Start/OnboardingPage";
import LoginPage from "../pages/Start/LoginPage";

import SendAllowancePage from "../pages/Parents/Allowance/SendAllowancePage";
import GroupPurchase from "../pages/Children/GroupPurchase/GroupPurchaseListPage";

const router = createBrowserRouter([
  { path: "/", element: <OnboardingPage />, index: true },
  { path: "/login", element: <LoginPage />, index: true },
  { path: "/GroupPurchase", element: <GroupPurchase />, index: true },
  { path: "/sendallowancepage", element: <SendAllowancePage />, index: true },

]);

export default router;
