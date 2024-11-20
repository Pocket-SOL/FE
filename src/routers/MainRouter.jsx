import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Layout";
import OnboardingPage from "../pages/Start/OnboardingPage";
import LoginPage from "../pages/Start/LoginPage";
import GroupPurchase from "../pages/Children/GroupPurchase/GroupPurchaseListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <OnboardingPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/GroupPurchase", element: <GroupPurchase /> },
    ],
  },
]);

export default router;
