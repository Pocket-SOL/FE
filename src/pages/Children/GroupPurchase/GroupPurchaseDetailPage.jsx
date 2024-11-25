import axios from "axios";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function GroupPurchaseDetailPage() {
	const { purchaseId } = useParams(); // URL에서 purchaseId 파라미터 추출
	const [purchaseDetails, setPurchaseDetails] = useState(null);

	useEffect(() => {
		console.log("detail", purchaseId);
		const fetchPurchaseDetails = async () => {
			try {
				const response = await axios.get(`/api/purchases/${purchaseId}`);
				setPurchaseDetails(response.data); // 응답 데이터로 구매 세부사항 설정
				console.log(response.data);
			} catch (error) {
				console.error("구매 상세 정보를 가져오는 중 오류 발생:", error);
			}
		};
		if (purchaseId) {
			fetchPurchaseDetails();
		}
	}, [purchaseId]); // purchaseId가 변경될 때마다 호출

	// purchaseDetails가 null이면 "Loading..."을 표시
	if (!purchaseDetails) {
		return (
			<div className="flex items-center justify-center h-screen bg-gray-100 text-gray-600">
				Loading...
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50">
			<div className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden">
				{/* Image Section */}
				<div className="h-64 w-full">
					<img
						src="/path-to-your-image.jpg" // 실제 이미지 경로로 교체
						alt="마감 관련 이미지"
						className="h-full w-full object-cover"
					/>
				</div>

				{/* Content Section */}
				<div className="p-6">
					{/* Title and Description */}
					<div className="border-b pb-4 mb-4">
						<h1 className="text-3xl font-bold text-gray-800 mb-2">
							{purchaseDetails.title}
						</h1>
						<p className="text-gray-600">{purchaseDetails.content}</p>
					</div>

					{/* Deadline Section */}
					<div className="flex items-center justify-between mb-4">
						<div>
							<h2 className="text-lg font-medium text-gray-700">마감일</h2>
							<p className="text-gray-500">{purchaseDetails.end_date}</p>
						</div>
					</div>

					{/* Participant and Comment Section */}
					<div className="flex items-center justify-between text-gray-700">
						<div className="flex items-center space-x-4">
							<span className="text-lg">
								마감인원: {purchaseDetails.participants}명
							</span>
							<Comment purchaseId={purchaseId} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
