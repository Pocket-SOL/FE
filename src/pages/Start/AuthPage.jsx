import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchCreateAccount } from "../../libs/apis/accounts";

import { fetchUser, fetchSaveToken } from "../../libs/apis/users";
export default function AuthPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [activeTab, setActiveTab] = useState("auth");

	const queryParams = new URLSearchParams(location.search);
	const code = queryParams.get("code");

	useEffect(() => {
		console.log("useEffect");

		let temp = location.state?.userId;
		console.log(temp);

		if (temp) {
			localStorage.setItem("userId", temp);
		}
	}, []);

	const fetchOauth = async () => {
		const response = await axios.post("/api/users/oauth");
		// console.log(response, response.data);
		const authUrl = await response.data;
		window.open(authUrl, "_blank");
	};

	const fetchToken = async (code) => {
		if (code === null) {
			alert("인증을 먼저 진행해주세요");
			return;
		}

		setIsLoading(true);
		try {
			const response = await axios.post("/api/users/token", { code });
			if (response.data.rsp_code) {
				console.log(response);
				throw new Error("토큰 요청 중 오류가 발생했습니다");
			}

			const userId = localStorage.getItem("userId");

			// token을 db에 저장
			console.log(response.data);
			try {
				await fetchSaveToken(
					userId,
					response.data.access_token,
					response.data.user_seq_no,
				);
			} catch (error) {
				console.error("토큰 저장 실패:", error);
				alert("토큰 저장에 실패했습니다. 다시 시도해주세요.");
				return;
			}

			// 토큰으로 fin_tech_num 받아오기
			let userData;
			try {
				userData = await fetchUser(
					response.data.access_token,
					response.data.user_seq_no,
				);
			} catch (error) {
				console.error("사용자 정보 조회 실패:", error);
				alert("사용자 정보를 가져오는 데 실패했습니다.");
				return;
			}
			// console.log(userData);
			if (!userData || !userData.res_list || userData.res_list.length === 0) {
				alert("유효한 사용자 정보를 찾을 수 없습니다.");
				return;
			}

			const num = userData.res_list[0].fintech_use_num;

			//계좌 생성
			let account;
			try {
				account = await fetchCreateAccount(userId, num);
				console.log(account);
			} catch (error) {
				console.error("계좌 생성 실패:", error);
				alert("계좌 생성에 실패했습니다. 다시 시도해주세요.");
				return;
			}

			alert(
				"토큰 발급 및 계좌 생성을 완료했습니다. 로그인 페이지로 이동합니다.",
			);
			navigate("/login");

			return response.data;
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
