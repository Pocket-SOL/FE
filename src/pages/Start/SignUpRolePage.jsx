import { useNavigate } from "react-router-dom";

export default function SignUpRolePage() {
	const navigate = useNavigate();

	const handleRoleSelection = (role) => {
		navigate("/sign-up-form", { state: { role } });
	};

	return (
		<div className="w-full flex flex-col items-center h-screen p-4">
			<h1 className="text-2xl text-black mb-8">역할을 선택해주세요</h1>
			<div className="w-full gap-6 flex  p-6">
				<button
					className="w-full h-36 rounded-lg bg-blue-500 text-white text-lg font-bold cursor-pointer hover:bg-blue-600"
					onClick={() => handleRoleSelection("parent")}
				>
					부모님으로
					<br />
					시작하기
				</button>
				<button
					className="w-full h-36 rounded-lg bg-yellow-400 text-white text-lg font-bold cursor-pointer hover:bg-yellow-500"
					onClick={() => handleRoleSelection("child")}
				>
					아이로
					<br />
					시작하기
				</button>
			</div>
		</div>
	);
}
