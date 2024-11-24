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
import ChildUsageHistoryPage from "../pages/Parents/Usage/UsageHistoryPage";

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
					{ path: "usagehistory", element: <ChildUsageHistoryPage /> },
				],
			},

			//children
			{
				path: "group-purchase", // 그룹 구매 부모 경로
				children: [
					{ path: "", element: <GroupPurchaseListPage /> }, // 그룹 구매 목록
					{ path: ":purchaseId", element: <GroupPurchaseDetailPage /> }, // 그룹 구매 상세 (purchaseId 포함)
					{ path: "reg", element: <GroupPurchaseReg /> }, // 그룹 구매 등록
					{ path: "complete", element: <GroupPurchaseComplete /> }, // 그룹 구매 완료
				],
			},
			{ path: "/UsageHistory", element: <UsageHistoryPage />, index: true },
		],
	},
]);

export default router;
