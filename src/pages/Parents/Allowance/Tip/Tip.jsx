import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTip } from "../../../../libs/apis/tip";
import axios from "axios";

export default function Tip() {
	const [tipData, setTipData] = useState("");
	const [loading, setLoading] = useState(true);
	const [currentQuestion, setCurrentQuestion] = useState(null);
	const [isVisible, setIsVisible] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchTips = async () => {
			try {
				const response = await fetchTip();
				console.log(response);

				const randomQuestion =
					response[Math.floor(Math.random() * response.length)];
				setTipData(response);
				setCurrentQuestion(randomQuestion);

				setLoading(false);
				// 데이터 로드 후 애니메이션 시작
				setTimeout(() => setIsVisible(true), 100);
			} catch (error) {
				console.error("오류", error);
				setLoading(true);
			}
		};
		fetchTips();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-in-out">
			<div
				className={`max-w-2xl mx-auto transform transition-all duration-700 ${
					isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
				}`}
			>
				<div className="bg-white rounded-lg shadow-md p-4 space-y-8 hover:shadow-xl transition-shadow duration-300">
					{/*질문부분 */}
					<div className="space-y-4">
						<h2 className="text-xl font-semibold text-gray-800 text-center animate-bounce">
							🌟오늘의 팁🌟
						</h2>
						<div
							className={`p-4 bg-blue-50 rounded-lg transform transition-all duration-500 ${
								isVisible
									? "translate-x-0 opacity-100"
									: "translate-x-[-50px] opacity-0"
							}`}
						>
							<p className="text-gray-700 text-lg text-center">
								{currentQuestion?.tip}
							</p>
						</div>
					</div>

					{/* 답변 */}
					<div className="space-y-4">
						<h3 className="text-lg font-medium text-gray-700 text-center">
							해결방법
						</h3>
						<div
							className={`p-4 bg-green-50 rounded-lg transform transition-all duration-500 delay-300 ${
								isVisible
									? "translate-x-0 opacity-100"
									: "translate-x-[50px] opacity-0"
							}`}
						>
							<p className="text-lg text-gray-600 text-center">
								{currentQuestion?.answer}
							</p>
						</div>
					</div>

					<div
						className={`flex flex-col items-center p-5 mx-auto mt-0 transform transition-all duration-500 delay-500 ${
							isVisible
								? "translate-y-0 opacity-100"
								: "translate-y-10 opacity-0"
						}`}
					>
						<button
							onClick={() => {
								navigate("/parents");
							}}
							className="bg-gray-200 text-gray-700 rounded-2xl w-52 h-12 text-xl 
                shadow-md hover:shadow-lg transition-all duration-300 
                hover:bg-gray-300 hover:-translate-y-1 active:translate-y-0"
						>
							홈으로 돌아가기
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
