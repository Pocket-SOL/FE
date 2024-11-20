import { createBrowserRouter } from "react-router-dom";

import OnboardingPage from "../pages/Start/OnboardingPage";
import LoginPage from "../pages/Start/LoginPage";
import GroupPurchaseListPage from "../pages/Children/GroupPurchase/GroupPurchaseListPage";
import GroupPurchaseDetailPage from "../pages/Children/GroupPurchase/GroupPurchaseDetailPage";

const router = createBrowserRouter([
  { path: "/", element: <OnboardingPage />, index: true },
  { path: "/login", element: <LoginPage />, index: true },
  {
    path: "/GroupPurchaseListPage",
    element: <GroupPurchaseListPage />,
    index: true,
  },
  {
    path: "/GroupPurchaseDetailPage",
    element: <GroupPurchaseDetailPage />,
    index: true,
  },
]);

export default router;
