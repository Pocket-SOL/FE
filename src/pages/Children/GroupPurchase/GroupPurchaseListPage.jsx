import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultcharacter from "~/images/defaultcharacter.png";
export default function GroupPurchaseListPage() {
	const navigate = useNavigate();
	const [purchaseList, setPurchaseList] = useState([]); // 구매 목록 상태

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
	console.log(purchaseList);
	return (
		<div className="bg-gray-50 py-24 sm:py-32">
			<div className="mx-auto max-w-3xl px-6 lg:px-8">
				<div className="mx-auto max-w-xl lg:mx-0">
					<h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
						진행중인 목록
					</h2>
					<p className="mt-2 text-lg text-gray-600">
						현재 참여할 수 있는 공동구매 목록을 확인하세요.
					</p>
				</div>
				<div className="mt-16 flex flex-col gap-y-16">
					{purchaseList.length > 0 ? (
						purchaseList.map((purchase) => (
							<article
								key={purchase.id}
								className="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-shadow border-t border-gray-200"
							>
								{/* 이미지 */}
								<img
									src={purchase.image || { defaultcharacter }}
									alt={purchase.title}
									className="h-72 w-full object-cover"
								/>

								{/* 내용 */}
								<div className="p-8">
									{/* 제목 */}
									<h3
										className="text-2xl font-semibold text-gray-900 cursor-pointer hover:text-gray-600"
										onClick={() =>
											navigate(`/group-purchase/${purchase.purchase_id}`)
										}
									>
										{purchase.title}
									</h3>

									{/* 설명 */}
									<p className="mt-4 text-base text-gray-600 line-clamp-3">
										{purchase.content || "내용이 없습니다."}
									</p>

									{/* 날짜 및 카테고리 */}
									<div className="mt-6 flex items-center justify-between text-sm text-gray-500">
										<time>마감일: {purchase.end_date}</time>
									</div>
								</div>

								{/* 작성자 */}
								<div className="flex items-center p-6 border-t border-gray-200">
									<img
										src={
											purchase.creator_avatar ||
											"https://via.placeholder.com/48"
										}
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
						<div className="text-gray-500 text-center">
							목록이 비어 있습니다.
						</div>
					)}
				</div>
				{/* 플로팅 버튼 */}
				<button
					onClick={() => navigate("/Group-Purchase/reg")}
					className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-600"
				>
					+
				</button>
			</div>
		</div>
	);
}
