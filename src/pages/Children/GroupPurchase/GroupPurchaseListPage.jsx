import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import defaultcharacter from "~/images/defaultcharacter.png";
import noimage from "~/images/noimage.png";

export default function GroupPurchaseListPage() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [purchaseList, setPurchaseList] = useState([]); // 구매 목록 상태
	const [activeTab, setActiveTab] = useState("ongoing"); // 현재 활성 탭 상태
	const [isClosedModalOpen, setIsClosedModalOpen] = useState(false);
	const [purchaseIds, setpurchaseIds] = useState([]);
	const [isToggled, setIsToggled] = useState(false);
	const [loading, setLoading] = useState(true); // 로딩 상태 추가
	useEffect(() => {
		const fetchPurchases = async () => {
			try {
				const response = await axios.get("/api/purchases");
				setPurchaseList(response.data); // 응답 데이터를 상태에 저장
			} catch (error) {
				console.error("구매 목록을 가져오는 중 오류 발생:", error);
			}
		};
		const fetcharr = async () => {
			try {
				const response = await axios.get(
					`/api/purchases/participant/${user.user_id}`,
				);
				setpurchaseIds(response.data.purchaseIds);
			} catch (error) {
				console.error("참가 배열을 가져오는 중 오류 발생", error);
			}
		};
		fetchPurchases();
		fetcharr();
		setLoading(false); // 데이터 로드 완료 후 로딩 종료
	}, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행

	// 진행중인 목록, 완료된 목록
	const handleToggle = () => {
		setIsToggled((prev) => !prev);
	};

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	const handleDelete = async (purchaseId) => {
		try {
			const response = await axios.delete(`/api/purchases/${purchaseId}`, {
				data: { user_id: user.user_id }, // 현재 사용자의 user_id 전달
			});

			if (response.data.ok) {
				alert("삭제되었습니다.");
				setPurchaseList((prev) =>
					prev.filter((item) => item.purchase_id !== purchaseId),
				);
			}
		} catch (error) {
			if (error.response?.status === 403) {
				setIsClosedModalOpen(true); // 권한 없음 경고 모달 띄우기
			} else {
				console.error("삭제 중 오류 발생:", error);
			}
		}
	};

	const ftPurchaseList =
		activeTab === "ongoing"
			? purchaseList.filter((purchase) => {
					return (
						purchase.status === "ongoing" && purchase.school === user.school
					);
				})
			: purchaseList.filter((purchase) => {
					return purchase.status === "end" && purchase.school === user.school;
				});

	const ftPurchaseList2 =
		activeTab === "ongoing"
			? purchaseList.filter((purchase) => {
					return (
						purchase.status === "ongoing" &&
						purchaseIds.includes(purchase.purchase_id) &&
						purchase.school === user.school
					);
				})
			: purchaseList.filter((purchase) => {
					return (
						purchase.status === "end" &&
						purchaseIds.includes(purchase.purchase_id) &&
						purchase.school === user.school
					);
				});

	return (
		<div className="w-full">
			<div className="w-full p-4">
				{/* Nav & Tabs */}
				<div className="border-b border-gray-200 mb-8">
					<nav className="flex space-x-4 justify-center">
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
				<div className="px-6">
					<div>
						<p className="text-gray-600">{user.school}</p>
					</div>
					{activeTab === "ongoing" ? (
						<div className="mx-auto max-w-xl lg:mx-0 py-2 ">
							<h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl py-2 sm:py-5 ">
								진행중인 목록
							</h2>
							<p className=" text-lg text-gray-600">
								현재 참여할 수 있는 공동구매 목록을 확인하세요.
							</p>
						</div>
					) : (
						<div className="mx-auto max-w-xl lg:mx-0 py-2 ">
							<h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl py-2 sm:py-5 ">
								완료된 목록
							</h2>
							<p className=" text-lg text-gray-600">
								이미 완료된 공동구매 목록을 확인하세요.
							</p>
						</div>
					)}

					{/* 로딩 스피너 */}
					{loading ? (
						<div className="flex justify-center items-center py-10">
							<div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
						</div>
					) : (
						<div>
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
								<span className="text-gray-600">
									{isToggled
										? "내가 참여한 글만 보기"
										: "내가 참여한 글만 보기"}
								</span>
								{/* 오른쪽 하단에 글쓰기 버튼 추가 */}
								<button
									className="fixed bottom-5 right-8 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
									onClick={() => navigate("/children/group-purchase/reg")}
								>
									글쓰기
								</button>
							</div>
							<div className="mt-5 flex flex-col gap-y-16">
								{purchaseList.length > 0 ? (
									isToggled ? (
										ftPurchaseList2.map((purchase) => (
											<article
												key={purchase.purchase_id}
												className="overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-shadow border-t border-gray-200"
												onClick={() =>
													navigate(
														`/children/group-purchase/${purchase.purchase_id}`,
													)
												}
											>
												<div className="flex items-center">
													{" "}
													{/* 이미지와 텍스트 수직 정렬 */}
													{/* 텍스트 섹션 */}
													<div className="w-1/2 p-2 pr-0">
														<h3 className="text-2xl font-semibold text-gray-900 cursor-pointer hover:text-gray-600">
															{purchase.title}
														</h3>
														<div className="mt-6 flex flex-col text-sm text-gray-500">
															<time className="mb-2">
																마감일:
																<br /> {purchase.end_date}
															</time>
															{purchase.status === "ongoing" ? (
																<span>{purchase.participants}명 모집 중</span>
															) : (
																<span>{purchase.participants}명 모집</span>
															)}
															<p className="text-lg font-semibold text-blue-600">
																{purchase.status === "ongoing"
																	? `현재 ${purchase.count}명 참여`
																	: `${purchase.count}명 모집완료`}
															</p>
														</div>
													</div>
													{/* 이미지 섹션 */}
													<div className="w-1/2 flex items-center justify-center">
														<img
															src={purchase.image || noimage}
															alt={purchase.title}
															className="h-[130px] object-cover object-center rounded-lg shadow"
														/>
													</div>
												</div>

												{/* 작성자 정보 */}
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
												key={purchase.purchase_id}
												className="overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-shadow border-t border-gray-200"
												onClick={() =>
													navigate(
														`/children/group-purchase/${purchase.purchase_id}`,
													)
												}
											>
												<div className="flex items-center">
													<div className="w-1/2 p-2 pr-0">
														<h3 className="text-2xl font-semibold text-gray-900 cursor-pointer hover:text-gray-600">
															{purchase.title}
														</h3>
														<div className="mt-6 flex flex-col text-sm text-gray-500">
															<time className="mb-2">
																마감일:
																<br /> {purchase.end_date}
															</time>
															{purchase.status === "ongoing" ? (
																<span>{purchase.participants}명 모집 중</span>
															) : (
																<span>{purchase.participants}명 모집</span>
															)}
															<p className="text-lg font-semibold text-blue-600">
																{purchase.status === "ongoing"
																	? `현재 ${purchase.count}명 참여`
																	: `${purchase.count}명 모집완료`}
															</p>
														</div>
													</div>
													<div className="w-1/2 flex items-center justify-center">
														<img
															src={purchase.image || noimage}
															alt={purchase.title}
															className="h-[130px] object-cover object-center rounded-lg shadow"
														/>
													</div>
												</div>
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
									<div className="text-center py-10">
										진행 중인 목록이 없습니다.
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
