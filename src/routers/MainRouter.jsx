import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Layout";

// Start
import OnboardingPage from "../pages/Start/OnboardingPage";
import LoginPage from "../pages/Start/LoginPage";
import SignUpRolePage from "../pages/Start/SignUpRolePage";
import SignUpFormPage from "../pages/Start/SignUpFormPage";

// Parents
import ParentsHomePage from "../pages/Parents/HomePage";
import SendAllowancePage from "../pages/Parents/Allowance/SendAllowancePage";
import FixedExpenseListPage from "../pages/Parents/Allowance/FixedExpenseListPage";
import AddFixedExpensePage from "../pages/Parents/Allowance/AddFixedExpensePage";
import SendCompletePage from "../pages/Parents/Allowance/SendCompletePage";

// Children
import ChildrenHomePage from "../pages/Children/HomePage";
import GroupPurchaseListPage from "../pages/Children/GroupPurchase/GroupPurchaseListPage";
import GroupPurchaseDetailPage from "../pages/Children/GroupPurchase/GroupPurchaseDetailPage";
import GroupPurchaseReg from "../pages/Children/GroupPurchase/GroupPurchaseReg";
import GroupPurchaseComplete from "../pages/Children/GroupPurchase/GroupPurchaseComplete";
import UsageHistoryPage from "../pages/Children/Usage/UsageHistoryPage";
import ChildUsageHistoryPage from "../pages/Parents/Usage/UsageHistoryPage";
import PhotoUpload from "../pages/Children/Usage/PhotoUploadPage";
import AllowanceRequest from "../pages/Children/Allowance/AllowanceRequestPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			// Start
			{ path: "/", element: <OnboardingPage /> },
			{ path: "/login", element: <LoginPage /> },
			{ path: "/sign-up-role", element: <SignUpRolePage /> },
			{ path: "/sign-up-form", element: <SignUpFormPage /> },

			// Parents
			{
				path: "parents",
				children: [
					{ path: "", element: <ParentsHomePage /> },
					{ path: "send-allowance", element: <SendAllowancePage /> },
					{ path: "fixed-expense-list", element: <FixedExpenseListPage /> },
					{ path: "add-fixed-expense", element: <AddFixedExpensePage /> },
					{ path: "send-complete", element: <SendCompletePage /> },
					{ path: "usagehistory", element: <ChildUsageHistoryPage /> },
				],
			},

			// Children
			{
				path: "children",
				children: [
					{ path: "", element: <ChildrenHomePage /> },
					{ path: "group-purchase-list", element: <GroupPurchaseListPage /> },
					{
						path: "group-purchase-detail",
						element: <GroupPurchaseDetailPage />,
					},
					{ path: "group-purchase-reg", element: <GroupPurchaseReg /> },
					{
						path: "group-purchase-complete",
						element: <GroupPurchaseComplete />,
					},
					{ path: "usage-history", element: <UsageHistoryPage /> },
				],
			},

			{
				path: "/UsageHistory",
				children: [
					{ index: true, element: <UsageHistoryPage /> },
					{ path: "photo", element: <PhotoUpload /> },
				],
			},
			{ path: "/AllowanceRequest", element: <AllowanceRequest /> },
		],
	},
]);

export default router;
