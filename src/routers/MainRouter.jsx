import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Layout";

// Start
import OnboardingPage from "../pages/Start/OnboardingPage";
import LoginPage from "../pages/Start/LoginPage";

// Parents
import ParentsHomePage from "../pages/Parents/HomePage";
import SendAllowancePage from "../pages/Parents/Allowance/SendAllowancePage";
import FixedExpenseListPage from "../pages/Parents/Allowance/FixedExpenseListPage";

// Children
import GroupPurchaseListPage from "../pages/Children/GroupPurchase/GroupPurchaseListPage";
import GroupPurchaseDetailPage from "../pages/Children/GroupPurchase/GroupPurchaseDetailPage";
import GroupPurchaseReg from "../pages/Children/GroupPurchase/GroupPurchaseReg";
import GroupPurchaseComplete from "../pages/Children/GroupPurchase/GroupPurchaseComplete";
import UsageHistoryPage from "../pages/Children/Usage/UsageHistoryPage";
import AddFixedExpensePage from "../pages/Parents/Allowance/AddFixedExpensePage";
import SendCompletePage from "../pages/Parents/Allowance/SendCompletePage";
import ChildUsageHistoryPage from "../pages/Parents/Usage/UsageHistoryPage";

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
			{ path: "/SendCompletePage", element: <SendCompletePage /> },

			// Parents
			{
				path: "parents",
				// element: <ParentsHomePage />,
				children: [
					{ index: true, element: <ParentsHomePage /> },
					{ path: "sendallowancepage", element: <SendAllowancePage /> },
					{ path: "fixedexpenselistpage", element: <FixedExpenseListPage /> },
					{ path: "usagehistory", element: <ChildUsageHistoryPage /> },
				],
			},

			// Children

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
