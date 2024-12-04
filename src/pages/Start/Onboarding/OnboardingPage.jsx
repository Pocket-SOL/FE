import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa"; // 체크 아이콘을 임포트

const features = [
	{
		text: "똑똑한 용돈 관리",
	},
	{
		text: "우리 아이 금융 교육",
	},
	{
		text: "친구들과 함께하는 공동구매",
	},
];

export const OnboardingPage = () => {
	const navigate = useNavigate();
	return (
		<main className="flex flex-col w-full bg-white rounded-lg p-4 mx-auto overflow-hidden">
			<section className="flex flex-col w-full mt-12 px-6">
				<header className="flex items-center">
					<div className="flex flex-col">
						<h1 className="text-4xl font-normal w-full">
							<span className="font-semibold text-[#0084fc]">Pocket SOL</span>
							<br />
							용돈도 똑똑하게,
							<br />
							금융도 재미있게!
						</h1>
						<p className="text-base mt-4 text-left">
							로그인이 필요한 서비스에요.
						</p>
					</div>
				</header>

				<section className="mt-5 w-full">
					{features.map((feature, index) => (
						<div key={index} className="flex items-start gap-3">
							<FaCheck className="text-[#0084fc] mt-1" size={20} />{" "}
							{/* 체크 아이콘 추가 */}
							<p>{feature.text}</p>
						</div>
					))}
				</section>

				<button
					className="w-full mt-[80px] py-3 text-white bg-[#0084fc] rounded-lg text-lg font-semibold hover:bg-[#0073e6] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0084fc]"
					onClick={() => {
						navigate("/login");
					}}
				>
					시작하기
				</button>
			</section>
		</main>
	);
};
