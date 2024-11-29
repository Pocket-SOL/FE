import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Onboarding/OnboardingPage.module.css";
import qs from "qs";
import axios from "axios";
import { fetchSaveToken } from "../../libs/apis/users";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
export default function AuthPage() {
	const { userId, setUserId } = useAuth();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const code = queryParams.get("code");

	const navigate = useNavigate();

	useEffect(() => {
		console.log("useEffect");

		let temp = location.state?.userId;
		console.log(temp);

		if (temp) {
			setUserId(temp);
			// localStorage.setItem("userId", userId);
		}
	}, []);
	//Oauth
	const fetchOauth = async () => {
		const newWindow = window.open("", "_blank");
		const clientId = import.meta.env.VITE_OPEN_BANK_ID;
		const auth = `https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=${clientId}&scope=login%20inquiry%20transfer&state=12345678901234567890123456789012&auth_type=1&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth`;
		newWindow.location.href = auth;
	};

	//token
	const fetchToken = async (code) => {
		const clientId = import.meta.env.VITE_OPEN_BANK_ID;
		const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

		if (code === null) {
			alert("인증을 먼저 진행해주세요");
			return;
		}

		// 요청 데이터 생성
		const requestData = qs.stringify({
			code: code,
			client_id: clientId,
			client_secret: clientSecret,
			redirect_uri: "http://localhost:5173/auth",
			grant_type: "authorization_code",
		});

		try {
			const response = await axios.post(
				"/oauth/2.0/token", // Proxy 경유
				requestData,
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				},
			);

			console.log("응답 데이터:", response.data);
			if (response.data.rsp_code) {
				alert("토큰 요청 중 오류가 발생했습니다. 처음부터 다시 시도해주세요");
				return;
			}
			alert("토큰 발급을 완료했습니다. 로그인 페이지로 이동합니다.");
			console.log("userId", userId);
			fetchSaveToken(
				localStorage.getItem("userId"),
				response.data.access_token,
			);
			navigate("/login");
			// return response.data;
		} catch (error) {
			// 오류 처리
			if (error.response) {
				console.error("토큰 요청 실패:", error.response.data);
			} else {
				console.error("서버와 연결 실패:", error.message);
			}
		}
	};
	return (
		<main
			className={styles.onboardingContainer}
			style={{ alignItems: "center" }}
		>
			<h1>사용자 인증 페이지입니다.</h1>
			<br />
			<br />
			<div>
				<button onClick={() => fetchOauth()}>사용자 본인 인증</button>
			</div>
			<br />
			<div>
				<button onClick={() => fetchToken(code)}>토큰 발급</button>
			</div>
		</main>
	);
}
