import { useState } from "react";
import axios from "axios";
import DateSelection from "./DataSelection";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import {
	uploadHistoryImage,
	updateHistoryImage,
} from "../../../libs/apis/purchases";
export default function GroupPurchaseReg() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [formData, setFormData] = useState({
		title: "",
		amount: "",
		participants: 0,
		end_date: "",
		content: "",
		school: user.school,
	});
	const [img, setImg] = useState();

	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSliderChange = (e) => {
		setFormData({ ...formData, participants: e.target.value });
	};

	const handleChangeDate = (date) => {
		setFormData({ ...formData, end_date: date });
	};
	const handleChangeImage = (img) => {
		setImg(img);
	};

	//db에 등록해서, purchase_id받아오고, s3이미지등록, 다시 업데이트.
	const handleSubmit = async () => {
		try {
			const response = await axios.post("/api/purchases", formData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			if (response.data.ok) {
				// Purchase ID를 서버 응답에서 가져오기
				const purchaseId = response.data.response.purchase_id;

				// 사용자와 Purchase 연관 관계 추가
				await axios.post(
					`/api/purchases/user/${user.user_id}`,
					{
						purchase_id: purchaseId,
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					},
				);

				if (img) {
					const file = img;
					uploadHistoryImage(file, `purchases/${purchaseId}`)
						.then((result) => {
							updateHistoryImage(purchaseId, result.data.imageUrl).then(
								(res) => {
									if (res) {
										setIsSuccessModalOpen(true);
										// setTimeout(() => navigate("/children/group-purchase/"), 2000); // 2초 후 이동
									} else {
										setIsErrorModalOpen(true);
									}
								},
							);
						})
						.catch(() => {
							setIsErrorModalOpen(true);
						});
				}

				// 성공 메시지 표시
				// setIsSuccessModalOpen(true);
				navigate("/children/group-purchase/complete");
			} else {
				throw new Error("등록에 실패했습니다.");
			}
		} catch (error) {
			console.error("등록 실패:", error);
			setIsErrorModalOpen(true);
		}
	};

	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded-lg mt-8">
			<h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
				공동 구매 등록
			</h2>
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-600 mb-2">
					제목
				</label>
				<input
					type="text"
					name="title"
					placeholder="제목을 입력해 주세요."
					value={formData.title}
					onChange={handleChange}
					className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
			</div>
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-600 mb-2">
					가격
				</label>
				<input
					type="text"
					name="amount"
					placeholder="숫자만 입력해 주세요."
					value={formData.amount}
					onChange={handleChange}
					className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
			</div>
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-600 mb-2">
					모집 인원
				</label>
				<div className="text-gray-700 mb-2">{formData.participants}명</div>
				<input
					type="range"
					name="participants"
					max={10}
					value={formData.participants}
					onChange={handleSliderChange}
					className="w-full"
				/>
			</div>
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-600 mb-2">
					마감일
				</label>
				<DateSelection onChange={handleChangeDate} />
			</div>
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-600 mb-2">
					내용
				</label>
				<textarea
					name="content"
					placeholder="내용을 입력해 주세요."
					value={formData.content}
					onChange={handleChange}
					className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
					rows="4"
				></textarea>
			</div>

			{/* 이미지 추가 부분 */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-600 mb-2">
					이미지 업로드
				</label>
				<input
					type="file"
					accept="image/*"
					className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
					// 파일 선택 시 처리 로직을 추가하려면 onChange 이벤트 추가
					onChange={(e) => {
						handleChangeImage(e.target.files[0]);
					}}
				/>
			</div>

			{/* 이미지 미리보기 */}
			{formData.image && (
				<div className="mb-4">
					<img
						src={formData.image}
						alt="Preview"
						className="w-full h-64 object-cover rounded-lg mt-2"
					/>
				</div>
			)}

			<div className="flex justify-center">
				<button
					onClick={handleSubmit}
					className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
				>
					완료
				</button>
			</div>

			{/* 등록 성공 모달 */}
			{isSuccessModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-semibold text-gray-800 mb-4">
							등록이 성공적으로 완료되었습니다!
						</h2>
						<div className="flex justify-end space-x-4">
							<button
								onClick={() => {
									setIsSuccessModalOpen(false);
									navigate("/children/Group-Purchase/");
								}}
								className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
							>
								확인
							</button>
						</div>
					</div>
				</div>
			)}

			{/* 등록 실패 모달 */}
			{isErrorModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-semibold text-gray-800 mb-4">
							등록에 실패했습니다. 다시 시도해 주세요.
						</h2>
						<div className="flex justify-end space-x-4">
							<button
								onClick={() => setIsErrorModalOpen(false)}
								className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-300"
							>
								닫기
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
