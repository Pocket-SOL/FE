import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute() {
	const { isAuthenticated, authChecked, user } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const isParentRoute = location.pathname.startsWith("/parents"); // 부모 전용 경로인지 확인
	const isChildRoute = location.pathname.startsWith("/children"); // 자녀 전용 경로인지 확인

	useEffect(() => {
		if (authChecked) {
			if (!isAuthenticated) {
				// 인증되지 않은 경우 로그인 페이지로 리다이렉트
				navigate(`/login`);
				console.log(user);
			} else if (user.role === "parent" && !isParentRoute) {
				// 부모 계정이 자녀 전용 페이지에 접근하려는 경우
				navigate("/parents");
			} else if (user.role === "child" && !isChildRoute) {
				// 자녀 계정이 부모 전용 페이지에 접근하려는 경우
				navigate("/children");
			}
		}
	}, [
		isAuthenticated,
		authChecked,
		user,
		isParentRoute,
		isChildRoute,
		navigate,
	]);

	// 인증 상태가 확인될 때까지 로딩 화면 표시
	if (!authChecked) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Outlet />
		</>
	);
}
