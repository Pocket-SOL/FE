import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Layout";
import OnboardingPage from "../pages/Start/OnboardingPage";
import LoginPage from "../pages/Start/LoginPage";
import GroupPurchase from "../pages/Children/GroupPurchase/GroupPurchaseListPage";
import SendAllowancePage from "../pages/Parents/Allowance/SendAllowancePage";
import FixedExpenseListPage from "../pages/Parents/Allowance/FixedExpenseListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <OnboardingPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/GroupPurchase", element: <GroupPurchase /> },
      { path: "/sendallowancepage", element: <SendAllowancePage /> },
      { path: "/fixedexpenselistpage", element: <FixedExpenseListPage /> },
    ],
  },
]);

export default router;
