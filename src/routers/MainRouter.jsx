import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Layout";

// Start
import OnboardingPage from "../pages/Start/OnboardingPage";
import LoginPage from "../pages/Start/LoginPage";

// Parents
import ParentsHomePage from "../pages/Parents/HomePage";
import SendAllowancePage from "../pages/Parents/Allowance/SendAllowancePage";
import FixedExpenseListPage from "../pages/Parents/Allowance/FixedExpenseListPage";
import AddFixedExpensePage from "../pages/Parents/Allowance/AddFixedExpensePage";
import SendCompletePage from "../pages/Parents/Allowance/SendCompletePage";

// Children
import GroupPurchaseListPage from "../pages/Children/GroupPurchase/GroupPurchaseListPage";
import GroupPurchaseDetailPage from "../pages/Children/GroupPurchase/GroupPurchaseDetailPage";
import GroupPurchaseReg from "../pages/Children/GroupPurchase/GroupPurchaseReg";
import GroupPurchaseComplete from "../pages/Children/GroupPurchase/GroupPurchaseComplete";
import UsageHistoryPage from "../pages/Children/Usage/UsageHistoryPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			// Start
			{ path: "/", element: <OnboardingPage /> },
			{ path: "/login", element: <LoginPage /> },

			// Parents
			{
				path: "parents",
				children: [
					{ path: "", element: <ParentsHomePage /> },
					{ path: "send-allowance", element: <SendAllowancePage /> },
					{ path: "fixed-expense-list", element: <FixedExpenseListPage /> },
					{ path: "add-fixed-expense", element: <AddFixedExpensePage /> },
					{ path: "send-complete", element: <SendCompletePage /> },
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
