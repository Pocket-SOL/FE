import { createBrowserRouter } from "react-router-dom";

import OnboardingPage from "../pages/Start/OnboardingPage";
import LoginPage from "../pages/Start/LoginPage";

const router = createBrowserRouter([
  { path: "/", element: <OnboardingPage />, index: true },
  { path: "/login", element: <LoginPage />, index: true },
]);

export default router;
