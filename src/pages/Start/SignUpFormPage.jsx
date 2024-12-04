import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SignUpFormPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const role = location.state?.role || "parent";
	const today = new Date();
	const todayString = today.toISOString().split("T")[0];

	const [formData, setFormData] = useState({
		name: "",
		birthdate: "",
		username: "",
		password: "",
		confirmPassword: "",
		phone: "",
	});

	// 모든 기본 정보가 입력되었는지 체크하는 상태
	const isBasicInfoComplete =
		formData.name && formData.birthdate && formData.phone;

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData({ ...formData, [id]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault(); // 기본 form 동작 막기

		// 비밀번호 확인
		if (formData.password !== formData.confirmPassword) {
			alert("비밀번호가 일치하지 않습니다.");
			return;
		}

		// 서버로 요청 보내기
		try {
			const response = await fetch("/api/users/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: formData.username,
					password: formData.password,
					birth: formData.birthdate,
					username: formData.name,
					role,
					phone: formData.phone,
				}),
			});

			const result = await response.json();
			if (response.ok) {
				alert("회원가입이 완료되었습니다!");
				// 성공 시 추가 동작 (예: 페이지 이동)
				navigate("/auth", { state: { userId: result.data.user_id } });
			} else {
				alert(result.message || "회원가입 중 오류가 발생했습니다.");
			}
		} catch (error) {
			alert("서버와 통신 중 오류가 발생했습니다.");
		}
	};

	return (
		<div className="w-full flex flex-col items-center min-h-screen p-4">
			<form
				className="w-full max-w-lg space-y-6 p-6 flex-grow"
				onSubmit={handleSubmit}
			>
				<div className="flex flex-col gap-2 w-full">
					<label htmlFor="name" className="text-lg font-semibold">
						이름
					</label>
					<input
						id="name"
						type="text"
						placeholder="이름을 입력해주세요"
						className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md text-lg"
						value={formData.name}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label htmlFor="birthdate" className="text-lg font-semibold">
						생년월일
					</label>
					<input
						id="birthdate"
						type="date"
						max={todayString} // 오늘 날짜 이후 선택 불가
						className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md text-lg"
						value={formData.birthdate}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label htmlFor="phone" className="text-lg font-semibold">
						전화번호
					</label>
					<input
						id="phone"
						type="text"
						placeholder="전화번호를 입력해주세요"
						className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md text-lg"
						value={formData.phone}
						onChange={handleChange}
					/>
				</div>

				{/* 아이디, 비밀번호, 비밀번호 확인 입력란은 기본 정보가 모두 입력되었을 때만 표시 */}
				{isBasicInfoComplete && (
					<>
						<div className="flex flex-col gap-2 w-full">
							<label htmlFor="username" className="text-lg font-semibold">
								아이디
							</label>
							<input
								id="username"
								type="text"
								placeholder="아이디를 입력해주세요"
								className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md text-lg"
								value={formData.username}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<label htmlFor="password" className="text-lg font-semibold">
								비밀번호
							</label>
							<input
								id="password"
								type="password"
								placeholder="비밀번호를 입력해주세요"
								className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md text-lg"
								value={formData.password}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<label
								htmlFor="confirmPassword"
								className="text-lg font-semibold"
							>
								비밀번호 확인
							</label>
							<input
								id="confirmPassword"
								type="password"
								placeholder="비밀번호를 입력해주세요"
								className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md text-lg"
								value={formData.confirmPassword}
								onChange={handleChange}
							/>
						</div>

						<button
							type="submit"
							className="w-full mt-12 py-3 text-white bg-[#0084fc] rounded-lg text-lg font-semibold hover:bg-[#0073e6] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0084fc]"
						>
							회원가입
						</button>
					</>
				)}
			</form>
		</div>
	);
}
