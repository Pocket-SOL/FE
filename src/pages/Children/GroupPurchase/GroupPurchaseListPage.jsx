import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usePurchase } from "../../../contexts/PurchaseContext";
import { useAuth } from "../../../contexts/AuthContext";
import defaultcharacter from "~/images/defaultcharacter.png";
export default function GroupPurchaseListPage() {
	const navigate = useNavigate();
	const [purchaseList, setPurchaseList] = useState([]); // 구매 목록 상태
	const [activeTab, setActiveTab] = useState("ongoing"); // 현재 활성 탭 상태
	const { people } = usePurchase();
	const { user } = useAuth();
	const [isToggled, setIsToggled] = useState(false);

	const handleToggle = () => {
		setIsToggled((prev) => !prev);
	};

	useEffect(() => {
		const fetchPurchases = async () => {
			try {
				const response = await axios.get("/api/purchases");
				setPurchaseList(response.data); // 응답 데이터를 상태에 저장
			} catch (error) {
				console.error("구매 목록을 가져오는 중 오류 발생:", error);
			}
		};

		fetchPurchases();
	}, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};
	// 진행중인 목록, 완료된 목록
	const ftPurchaseList =
		activeTab === "ongoing"
			? purchaseList.filter((purchase) => {
					return purchase.status === "ongoing";
				})
			: purchaseList.filter((purchase) => {
					return purchase.status === "end";
				});

	// 진행중인 목록, 완료된 목록 & 내가 참여한 글
	const ftPurchaseList2 =
		activeTab === "ongoing"
			? purchaseList.filter((purchase) => {
					return (
						purchase.status === "ongoing" && purchase.user_id === user.user_id
					);
				})
			: purchaseList.filter((purchase) => {
					return purchase.status === "end" && purchase.user_id === user.user_id;
				});

	console.log(purchaseList);
	return (
		<div className="bg-gray-50 py-10 sm:py-10">
			<div className="mx-auto max-w-3xl px-6 lg:px-8">
				{/* Nav & Tabs */}
				<div className="border-b border-gray-200 mb-8  ">
					<nav className="flex space-x-4 justify-center ">
						<button
							onClick={() => handleTabChange("ongoing")}
							className={`py-3 px-6 text-lg font-medium ${
								activeTab === "ongoing"
									? "text-blue-600 border-b-2 border-blue-600"
									: "text-gray-500 hover:text-gray-700"
							}`}
						>
							진행중인 목록
						</button>
						<button
							onClick={() => handleTabChange("end")}
							className={`py-2 px-6 text-lg font-medium ${
								activeTab === "end"
									? "text-blue-600 border-b-2 border-blue-600"
									: "text-gray-500 hover:text-gray-700"
							}`}
						>
							완료된 목록
						</button>
					</nav>
				</div>
				{activeTab === "ongoing" ? (
					<div className="mx-auto max-w-xl lg:mx-0 py-2 ">
						<h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl py-3 sm:py-7 ">
							진행중인 목록
						</h2>
						<p className=" text-lg text-gray-600">
							현재 참여할 수 있는 공동구매 목록을 확인하세요.
						</p>
					</div>
				) : (
					<div className="mx-auto max-w-xl lg:mx-0 py-2 ">
						<h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl py-3 sm:py-7 ">
							완료된 목록
						</h2>
						<p className=" text-lg text-gray-600">
							이미 완료된 공동구매 목록을 확인하세요.
						</p>
					</div>
				)}

				<div className="flex items-center space-x-4">
					<button
						onClick={handleToggle}
						className={`w-12 h-6 flex items-center rounded-full p-1 ${
							isToggled ? "bg-blue-500" : "bg-gray-300"
						}`}
					>
						<div
							className={`h-4 w-4 bg-white rounded-full shadow-md transform duration-300 ${
								isToggled ? "translate-x-6" : "translate-x-0"
							}`}
						></div>
					</button>
					<span className="text-gray-700">
						{isToggled ? "내가 참여한 글만 보기" : "내가 참여한 글만 보기"}
					</span>
				</div>
				<div className="mt-5 flex flex-col gap-y-16">
					{purchaseList.length > 0 ? (
						isToggled ? (
							ftPurchaseList2.map((purchase) => (
								<article
									key={purchase.id}
									className="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-shadow border-t border-gray-200"
								>
									{/* 내용 */}
									<div className="p-8">
										{/* 제목 */}
										<h3
											className="text-2xl font-semibold text-gray-900 cursor-pointer hover:text-gray-600"
											onClick={() =>
												navigate(
													`/children/group-purchase/${purchase.purchase_id}`,
												)
											}
										>
											{purchase.title}
										</h3>

										{/* 설명 */}
										{/* <p className="mt-4 text-base text-gray-600 line-clamp-3">
										{purchase.content || "내용이 없습니다."}
									</p> */}

										{/* 날짜 및 카테고리 */}
										<div className="mt-6 flex flex-col text-sm text-gray-500">
											<time className="mb-2">마감일: {purchase.end_date}</time>
											<p className="text-lg font-semibold text-blue-600">
												현재 {people}명 진행 중
											</p>
										</div>
									</div>

									{/* 작성자 */}
									<div className="flex items-center p-6 border-t border-gray-200">
										<img
											src={purchase.creator_avatar || defaultcharacter}
											alt="작성자 프로필"
											className="w-14 h-14 rounded-full bg-gray-50"
										/>
										<div className="ml-4">
											<p className="text-sm font-medium text-gray-900">
												{purchase.username || "익명"}
											</p>
											<p className="text-sm text-gray-500">작성자</p>
										</div>
									</div>
								</article>
							))
						) : (
							ftPurchaseList.map((purchase) => (
								<article
									key={purchase.id}
									className="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-shadow border-t border-gray-200"
								>
									{/* 내용 */}
									<div className="p-8">
										{/* 제목 */}
										<h3
											className="text-2xl font-semibold text-gray-900 cursor-pointer hover:text-gray-600"
											onClick={() =>
												navigate(
													`/children/group-purchase/${purchase.purchase_id}`,
												)
											}
										>
											{purchase.title}
										</h3>

										{/* 설명 */}
										{/* <p className="mt-4 text-base text-gray-600 line-clamp-3">
										{purchase.content || "내용이 없습니다."}
									</p> */}

										{/* 날짜 및 카테고리 */}
										<div className="mt-6 flex flex-col text-sm text-gray-500">
											<time className="mb-2">마감일: {purchase.end_date}</time>
											<p className="text-lg font-semibold text-blue-600">
												현재 {people}명 진행 중
											</p>
										</div>
									</div>

									{/* 작성자 */}
									<div className="flex items-center p-6 border-t border-gray-200">
										<img
											src={purchase.creator_avatar || defaultcharacter}
											alt="작성자 프로필"
											className="w-14 h-14 rounded-full bg-gray-50"
										/>
										<div className="ml-4">
											<p className="text-sm font-medium text-gray-900">
												{purchase.username || "익명"}
											</p>
											<p className="text-sm text-gray-500">작성자</p>
										</div>
									</div>
								</article>
							))
						)
					) : (
						<div className="text-gray-500 text-center">
							목록이 비어 있습니다.
						</div>
					)}
				</div>
				{/* 플로팅 버튼 */}
				<button
					onClick={() => navigate("/children/Group-Purchase/reg")}
					className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-600"
				>
					+
				</button>
			</div>
		</div>
	);
}
