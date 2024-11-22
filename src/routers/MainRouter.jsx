import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Layout";
import OnboardingPage from "../pages/Start/OnboardingPage";
import LoginPage from "../pages/Start/LoginPage";

import SendAllowancePage from "../pages/Parents/Allowance/SendAllowancePage";
import FixedExpenseListPage from "../pages/Parents/Allowance/FixedExpenseListPage";
import GroupPurchaseListPage from "../pages/Children/GroupPurchase/GroupPurchaseListPage";
import GroupPurchaseDetailPage from "../pages/Children/GroupPurchase/GroupPurchaseDetailPage";
import GroupPurchaseReg from "../pages/Children/GroupPurchase/GroupPurchaseReg";
import GroupPurchaseComplete from "../pages/Children/GroupPurchase/GroupPurchaseComplete";
import UsageHistoryPage from "../pages/Children/Usage/UsageHistoryPage";
import AddFixedExpensePage from "../pages/Parents/Allowance/AddFixedExpensePage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ path: "/", element: <OnboardingPage /> },
			{ path: "/login", element: <LoginPage /> },
			{ path: "/sendallowancepage", element: <SendAllowancePage /> },
			{ path: "/fixedexpenselistpage", element: <FixedExpenseListPage /> },
			{ path: "/AddFixedExpensePage", element: <AddFixedExpensePage /> },
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
			{
				path: "/GroupPurchaseReg",
				element: <GroupPurchaseReg />,
				index: true,
			},
			{
				path: "/GroupPurchaseComplete",
				element: <GroupPurchaseComplete />,
				index: true,
			},
			{ path: "/UsageHistory", element: <UsageHistoryPage />, index: true },
		],
	},
]);

export default router;
