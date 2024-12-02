import axios from "axios";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { usePurchase } from "../../../contexts/PurchaseContext";
import { useNavigate } from "react-router-dom";
import noimage from "~/images/noimage.png";

export default function GroupPurchaseDetailPage() {
	const { purchaseId } = useParams(); // URL에서 purchaseId 파라미터 추출
	const [purchaseDetails, setPurchaseDetails] = useState(null);
	const [comments, setComments] = useState([]); // 댓글 리스트
	const [loading, setLoading] = useState(false); // 댓글 로딩 상태
	const { people, setPeople } = usePurchase();
	// const [people, setPeople] = useState(0);
	const [addPossible, setAddPossible] = useState(true);
	const [isClosedModalOpen, setIsClosedModalOpen] = useState(false); // 마감 모달 상태
	const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false); // 참여 모달 상태
	const { user } = useAuth();
	const navigate = useNavigate();

	const handleClosed = async () => {
		if (people !== purchaseDetails.participants) {
			setIsClosedModalOpen(true); // 마감 모달 열기
		}
	};

	const confirmClosed = async () => {
		setIsClosedModalOpen(false); // 마감 모달 닫기
		alert("마감 처리되었습니다.");

		await axios.put(`/api/purchases/${purchaseId}`);
		navigate("/children/group-purchase");
	};

	const handleAddUser = async () => {
		if (people === purchaseDetails.participants) {
			alert("인원이 다 찼어요!");
			return;
		}
		setIsAddUserModalOpen(true); // 참여 모달 열기
	};

	const confirmAddUser = async () => {
		const response = await axios.post(`/api/purchases/user/${user.user_id}`, {
			purchase_id: purchaseId,
		});

		setPeople(response.data.count);

		setAddPossible(false);
		setIsAddUserModalOpen(false); // 참여 모달 닫기
	};

	const handleDeleteUser = async () => {
		const response = await axios.post(
			`/api/purchases/user/delete/${user.user_id}`,
			{
				purchase_id: purchaseId,
			},
		);

		setPeople(response.data.count);
		setAddPossible(true);
	};

	const handleGetUser = async () => {
		const response = await axios.get(`/api/purchases/user/${purchaseId}`);
		const userArr = response.data.userList;
		if (userArr.includes(user.user_id)) {
			setAddPossible(false);
		}
		setPeople(response.data.count);
	};

	useEffect(() => {
		handleGetUser();
	}, []);

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
						src={purchaseDetails.image || noimage} // 실제 이미지 경로로 교체
						alt="상품 관련 이미지"
						className="h-full w-full object-contain"
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
					<h1 className="text-lg font-medium text-gray-700">
						{purchaseDetails.username}
					</h1>

					{/* Deadline Section */}
					<div className="flex items-center justify-between mb-4">
						<div>
							<p className="text-gray-500">
								마감일 : {purchaseDetails.end_date}
								<br />
								마감인원 : {purchaseDetails.participants}명
								<br />
								현재 : {people}명
							</p>
						</div>
					</div>

					{/* Participant and Comment Section */}
					<div>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<Comment
								writer={purchaseDetails.user_id}
								purchaseId={purchaseId}
								comments={comments}
								setComments={setComments}
								loading={loading}
							/>
							{user.username === purchaseDetails.username ? (
								<button
									onClick={handleClosed}
									className="flex items-center space-x-2 bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg shadow hover:bg-gray-700"
								>
									마감하기
								</button>
							) : addPossible ? (
								<button
									onClick={handleAddUser}
									className="flex items-center space-x-2 bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg shadow hover:bg-gray-700"
								>
									참여하기
								</button>
							) : (
								<button
									onClick={handleDeleteUser}
									className="flex items-center space-x-2 bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg shadow hover:bg-gray-700"
								>
									취소하기
								</button>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Closed Modal */}
			{isClosedModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-semibold text-gray-800 mb-4">
							인원이 다 모집되지 않았습니다. 마감하시겠습니까?
						</h2>
						<div className="flex justify-end space-x-4">
							<button
								onClick={() => setIsClosedModalOpen(false)}
								className="bg-gray-200 px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-300"
							>
								아니오
							</button>
							<button
								onClick={confirmClosed}
								className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600"
							>
								네
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Add User Modal */}
			{isAddUserModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-semibold text-gray-800 mb-4">
							이 모집에 참여하시겠습니까?
						</h2>
						<div className="flex justify-end space-x-4">
							<button
								onClick={() => setIsAddUserModalOpen(false)}
								className="bg-gray-200 px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-300"
							>
								취소
							</button>
							<button
								onClick={confirmAddUser}
								className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
							>
								확인
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
