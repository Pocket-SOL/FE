import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import qs from "qs";
import { fetchSaveToken } from "../../libs/apis/users";

export default function AuthPage() {
	const { userId, setUserId } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [activeTab, setActiveTab] = useState("auth");

	const queryParams = new URLSearchParams(location.search);
	const code = queryParams.get("code");

	useEffect(() => {
		const temp = location.state?.userId;
		if (temp) {
			setUserId(temp);
		}
	}, [location.state, setUserId]);

	const fetchOauth = async () => {
		const clientId = import.meta.env.VITE_OPEN_BANK_ID;
		const auth = `https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=${clientId}&scope=login%20inquiry%20transfer&state=12345678901234567890123456789012&auth_type=1&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth`;
		window.open(auth, "_blank");
	};

	const fetchToken = async (code) => {
		if (code === null) {
			alert("인증을 먼저 진행해주세요");
			return;
		}

		setIsLoading(true);

		const clientId = import.meta.env.VITE_OPEN_BANK_ID;
		const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

		const requestData = qs.stringify({
			code: code,
			client_id: clientId,
			client_secret: clientSecret,
			redirect_uri: "http://localhost:5173/auth",
			grant_type: "authorization_code",
		});

		try {
			const response = await axios.post("/oauth/2.0/token", requestData, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				},
			});

			if (response.data.rsp_code) {
				throw new Error("토큰 요청 중 오류가 발생했습니다.");
			}

			await fetchSaveToken(
				localStorage.getItem("userId"),
				response.data.access_token,
			);
			alert("토큰 발급을 완료했습니다. 로그인 페이지로 이동합니다.");
			navigate("/login");
		} catch (error) {
			console.error("토큰 요청 실패:", error);
			alert("토큰 발급에 실패했습니다. 다시 시도해주세요.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="py-10 sm:py-10">
			<div className="mx-auto max-w-3xl px-6 lg:px-8">
				{/* Nav & Tabs */}
				<div className="border-b border-gray-200 mb-8">
					<nav className="flex space-x-4 justify-center">
						<button
							onClick={() => setActiveTab("auth")}
							className={`py-3 px-6 text-lg font-medium ${
								activeTab === "auth"
									? "text-blue-600 border-b-2 border-blue-600"
									: "text-gray-500 hover:text-gray-700"
							}`}
						>
							사용자 인증
						</button>
					</nav>
				</div>

				<div className="mx-auto max-w-xl lg:mx-0 py-2 flex flex-col  justify-center">
					<p className="text-lg text-gray-600 ">
						계좌발급을 위해 <br />
						인증을 진행해주세요.
					</p>

					<p className="text-xs">인증은 가입시 한번만 진행됩니다.</p>
				</div>

				{isLoading ? (
					<div className="flex justify-center items-center py-10">
						<div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
					</div>
				) : (
					<div className="mt-5 flex flex-col gap-y-4">
						<button
							onClick={fetchOauth}
							className="flex items-center justify-center w-full px-4 py-3 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-0084FC-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							사용자 본인 인증
						</button>
						<button
							onClick={() => fetchToken(code)}
							className="flex items-center justify-center w-full px-4 py-3 text-lg font-medium text-black bg-gray-200 rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 "
						>
							토큰 발급
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
