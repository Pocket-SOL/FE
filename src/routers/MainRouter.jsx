import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Layout";

// Start
import { OnboardingPage } from "../pages/Start/Onboarding/OnboardingPage";
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
import HistoryDetailPage from "../pages/Children/Usage/HistoryDetailPage";

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

			//children
			{
				path: "children",
				children: [
					{ path: "", element: <ChildrenHomePage /> },
					{
						// 용돈 조르기
						path: "allowance-request",
						element: <AllowanceRequest />,
					},
					{
						// 우리학교 공동구매
						path: "group-purchase", // 그룹 구매 부모 경로
						children: [
							{ path: "", element: <GroupPurchaseListPage /> }, // 그룹 구매 목록
							{ path: ":purchaseId", element: <GroupPurchaseDetailPage /> }, // 그룹 구매 상세 (purchaseId 포함)
							{ path: "reg", element: <GroupPurchaseReg /> }, // 그룹 구매 등록
							{ path: "complete", element: <GroupPurchaseComplete /> }, // 그룹 구매 완료
						],
					},
					{
						path: "usage-history",
						children: [
							{ path: "", element: <UsageHistoryPage /> },
							{ path: "photo", element: <PhotoUpload /> },
							{ path: ":id", element: <HistoryDetailPage /> },
						],
					},
				],
			},
		],
	},
]);

export default router;
