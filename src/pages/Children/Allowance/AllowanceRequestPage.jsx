import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAllowance } from "../../../contexts/AllowanceContext";
import hand from "~/images/hand.png";

function Modal({ isOpen, onClose, onSubmit }) {
	const [inputValue, setInputValue] = useState("");

	const handleChange = (e) => {
		const value = e.target.value;
		if (value === "" || (Number(value) >= 0 && Number(value) <= 50000)) {
			setInputValue(value); // 입력값이 유효하면 상태 업데이트
		}
	};

	const handleConfirm = () => {
		if (inputValue !== "") {
			onSubmit(Number(inputValue)); // 부모 컴포넌트에 값 전달
		}
		onClose();
	};

	return (
		isOpen && (
			<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
				<div className="bg-white rounded-lg p-6 w-96">
					<h3 className="text-lg font-bold mb-4">금액 입력</h3>
					<input
						type="number"
						className="w-full p-2 border rounded mb-4"
						placeholder="금액을 입력하세요"
						min={0}
						max={50000}
						step={100}
						value={inputValue}
						onChange={handleChange}
					/>
					<div className="flex justify-end gap-4">
						<button
							onClick={onClose}
							className="px-4 py-2 bg-gray-300 rounded text-black"
						>
							취소
						</button>
						<button
							onClick={handleConfirm}
							className="px-4 py-2 bg-blue-500 text-white rounded"
						>
							확인
						</button>
					</div>
				</div>
			</div>
		)
	);
}

function AllowanceRequest() {
	const MAX_AMOUNT = 50000;
	const { amount, setAmount } = useAllowance();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();

	const handleSliderChange = (e) => {
		const value = Number(e.target.value);
		const roundedValue = Math.max(0, Math.round(value / 100) * 100);
		setAmount(roundedValue);
	};

	const displayAmount = Math.max(0, amount);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleModalSubmit = (value) => {
		setAmount(Math.round(value / 100) * 100); // 100 단위로 반올림
	};

	const calculateHandlePosition = () => {
		// 슬라이더의 핸들 위치를 계산 (0% ~ 100%)
		const percentage = (amount / MAX_AMOUNT) * 100;
		return `calc(${percentage}% - 8px)`; // 핸들의 중심을 맞추기 위해 보정값 적용
	};
	return (
		<div className="flex flex-col bg-white w-full">
			<main className="flex-1 flex flex-col">
				<div className="bg-blue-500 text-white py-16 text-center w-full">
					<h2 className="text-2xl mb-8">용돈 주세요!</h2>
					<div className="flex justify-center">
						<img
							src={hand}
							alt="character"
							loading="lazy"
							style={{ width: 170 }}
						/>
					</div>
				</div>

				<div className="px-6 py-12 text-center">
					<p className="text-2xl text-blue-500 mb-8">
						{displayAmount.toLocaleString()}원
					</p>

					<div className="mb-12">
						<div className="relative w-full h-16 flex items-center">
							<div className="absolute inset-0 flex justify-between items-center">
								{[...Array(7)].map((_, i) => (
									<div
										key={i}
										className="w-4 h-4 rounded-full bg-gray-200 transition-transform duration-300"
									/>
								))}
							</div>

							{/* 슬라이더 핸들 */}
							<div
								className="absolute w-4 h-12 bg-blue-500 rounded-full shadow-lg transform"
								style={{
									left: calculateHandlePosition(),
								}}
							/>
							<input
								type="range"
								min={0}
								max={MAX_AMOUNT}
								step={500}
								value={amount}
								onChange={handleSliderChange}
								className="absolute inset-0 opacity-0 cursor-pointer"
							/>
						</div>
					</div>
				</div>

				<div className="flex justify-between px-6 py-4 w-full max-w-md mx-auto">
					<button
						onClick={openModal}
						className="bg-gray-200 text-black rounded-2xl w-36 h-12 text-center text-lg shadow-md"
					>
						직접입력
					</button>
					<button
						onClick={() => {
							navigate("/children/allowance-request-confirm");
						}}
						className="bg-gray-200 text-black rounded-2xl w-36 h-12 text-center text-lg shadow-md"
					>
						다음
					</button>
				</div>
			</main>

			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
				onSubmit={handleModalSubmit}
			/>
		</div>
	);
}

export default AllowanceRequest;
