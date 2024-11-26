import axios from "axios";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../../../contexts/UserContext";

export default function GroupPurchaseDetailPage() {
	const { purchaseId } = useParams(); // URL에서 purchaseId 파라미터 추출
	const [purchaseDetails, setPurchaseDetails] = useState(null);
	const [comments, setComments] = useState([]); // 댓글 리스트
	const [loading, setLoading] = useState(false); // 댓글 로딩 상태
	const [people, setPeople] = useState(0);
	// const { user } = useAuth();
	const { user } = useUser();

	console.log("detail-user", user);
	console.log("purchase-detail", purchaseDetails);

	const handleAddUser = async () => {
		const response = await axios.post(`/api/purchases/user/${user.user_id}`, {
			purchase_id: purchaseId,
		});
		console.log(response.data);
	};

	useEffect(() => {
		const fetchComments = async () => {
			try {
				setLoading(true);
				const response = await axios.get(`/api/comments/${purchaseId}`);
				setComments(response.data.response); // API 응답에서 댓글 리스트 저장
			} catch (error) {
				console.error("댓글 조회 중 오류 발생:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchComments();
	}, []);

	useEffect(() => {
		const fetchPurchaseDetails = async () => {
			try {
				const response = await axios.get(`/api/purchases/${purchaseId}`);
				setPurchaseDetails(response.data); // 응답 데이터로 구매 세부사항 설정
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
					<h1 className="text-lg font-medium text-gray-700">{user.username}</h1>

					{/* Deadline Section */}
					<div className="flex items-center justify-between mb-4">
						<div>
							<p className="text-gray-500">
								마감일 : {purchaseDetails.end_date}
								<br />
								마감인원 : {purchaseDetails.participants}명
							</p>
						</div>
					</div>

					{/* Participant and Comment Section */}
					<div>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<Comment
								purchaseId={purchaseId}
								comments={comments}
								setComments={setComments}
								loading={loading}
							/>
							{user.username === purchaseDetails.username ? (
								<button className="flex items-center space-x-2 bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg shadow hover:bg-gray-700">
									마감하기
								</button>
							) : (
								<button
									onClick={handleAddUser}
									className="flex items-center space-x-2 bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg shadow hover:bg-gray-700"
								>
									참여하기
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
