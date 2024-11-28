import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Layout";
import ProtectedRoute from "./ProtectedRoute";

// Start
import { OnboardingPage } from "../pages/Start/Onboarding/OnboardingPage";
import LoginPage from "../pages/Start/LoginPage";
import SignUpRolePage from "../pages/Start/SignUpRolePage";
import SignUpFormPage from "../pages/Start/SignUpFormPage";

// Parents
import ParentsHomePage from "../pages/Parents/HomePage";
import ChildRegistrationPage from "../pages/Parents/ChildRegistrationPage";
import SendAllowancePage from "../pages/Parents/Allowance/SendAllowancePage";
import FixedExpenseListPage from "../pages/Parents/Allowance/FixedExpenseListPage";
import AddFixedExpensePage from "../pages/Parents/Allowance/AddFixedExpensePage";
import SendCompletePage from "../pages/Parents/Allowance/SendCompletePage";

// Children
import ChildrenHomePage from "../pages/Children/HomePage";
import ChildAcceptancePage from "../pages/Children/ChildAcceptancePage";
import GroupPurchaseListPage from "../pages/Children/GroupPurchase/GroupPurchaseListPage";
import GroupPurchaseDetailPage from "../pages/Children/GroupPurchase/GroupPurchaseDetailPage";
import GroupPurchaseReg from "../pages/Children/GroupPurchase/GroupPurchaseReg";
import GroupPurchaseComplete from "../pages/Children/GroupPurchase/GroupPurchaseComplete";
import UsageHistoryPage from "../pages/Children/Usage/UsageHistoryPage";
import ChildUsageHistoryPage from "../pages/Parents/Usage/UsageHistoryPage";
import PhotoUpload from "../pages/Children/Usage/PhotoUploadPage";
import AllowanceRequest from "../pages/Children/Allowance/AllowanceRequestPage";
import HistoryDetailPage from "../pages/Children/Usage/HistoryDetailPage";
import AllowanceRequestConfirmPage from "../pages/Children/Allowance/AllowanceRequestConfirmPage";
import AllowanceComplete from "../pages/Children/Allowance/AllowanceComplete";
import School from "../pages/Children/GroupPurchase/School";
import Photo from "../pages/Children/GroupPurchase/Photo";
import Quiz from "../pages/Children/Quiz/Quiz";

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
				element: <ProtectedRoute />,
				children: [
					{
						path: "",
						element: <ParentsHomePage />,
					},
					{
						path: "child-registration",
						element: <ChildRegistrationPage />,
					},
					{
						path: "send-allowance",
						element: <SendAllowancePage />,
					},
					{
						path: "fixed-expense-list",
						element: <FixedExpenseListPage />,
					},
					{ path: "add-fixed-expense", element: <AddFixedExpensePage /> },
					{ path: "send-complete", element: <SendCompletePage /> },
					{ path: "usagehistory", element: <ChildUsageHistoryPage /> },
				],
			},

			//children
			{
				path: "children",
				element: <ProtectedRoute />,
				children: [
					{ path: "", element: <ChildrenHomePage /> },
					{
						path: "child-acceptance",
						element: <ChildAcceptancePage />,
					},
					{
						// 용돈 조르기
						path: "allowance-request",
						element: <AllowanceRequest />,
					},
					{
						path: "allowance-request-confirm",
						element: <AllowanceRequestConfirmPage />,
					},
					{
						path: "allowance-complete",
						element: <AllowanceComplete />,
					},
					{
						path: "quiz",
						element: <Quiz />,
					},

					{
						// 우리학교 공동구매
						path: "group-purchase", // 그룹 구매 부모 경로
						children: [
							{ path: "school", element: <School /> }, // 그룹 구매 목록
							{ path: "photo", element: <Photo /> }, // 학생증 인증
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
