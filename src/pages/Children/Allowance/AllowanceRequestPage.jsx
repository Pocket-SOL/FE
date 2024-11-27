import { useState } from "react";
import hand from "~/images/hand.png";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAllowance } from "../../../contexts/AllowanceContext";
function AllowanceRequest() {
	// const [amount, setAmount] = useState(0);
	const MAX_AMOUNT = 25000; // 최대값 늘리면 500원씩 증가가안됨 /수정
	const { amount, setAmount } = useAllowance();
	const handleSliderChange = (e) => {
		const rawValue = Number(e.target.value);
		// -MAX_AMOUNT부터 +MAX_AMOUNT까지의 값을 0을 중심으로 변환
		const centered = rawValue - MAX_AMOUNT;
		const roundedValue = Math.round(centered / 500) * 500;
		setAmount(roundedValue);
	};

	// UI에 표시할 때는 음수 값을 0으로 표시
	const displayAmount = Math.max(0, amount);
	const { user } = useAuth();
	console.log(user);
	const navigate = useNavigate();

	return (
		<div className="flex flex-col min-h-screen bg-white">
			<main className="flex-1 flex flex-col">
				<div className="bg-blue-500 text-white py-16 px-4 text-center">
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
							<div className="absolute inset-0 flex justify-between items-center px-4">
								{[...Array(7)].map((_, i) => (
									<div
										key={i}
										className="w-4 h-4 rounded-full bg-gray-200 transition-transform duration-300"
									/>
								))}
							</div>

							<div
								className="absolute left-1/2 w-4 h-12 bg-blue-500 rounded-full shadow-lg transform"
								style={{
									transform: `translateX(${(amount / MAX_AMOUNT) * 800}%)`,
								}}
							/>

							<input
								type="range"
								min={0}
								max={MAX_AMOUNT * 2}
								step={500}
								value={amount}
								onChange={handleSliderChange}
								className="absolute inset-0 opacity-0 cursor-pointer"
							/>
						</div>
					</div>
				</div>

				<div className="flex justify-between px-6 py-4 w-full max-w-md mx-auto">
					<button className="bg-gray-200 text-black rounded-2xl w-36 h-12 text-center text-lg shadow-md">
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
		</div>
	);
}

export default AllowanceRequest;
