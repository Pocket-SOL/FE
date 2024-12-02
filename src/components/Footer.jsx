import { FaGithub } from "react-icons/fa"; // github 아이콘을 위한 라이브러리

export default function Footer() {
	return (
		<footer className="w-full bg-light py-4" style={{ height: "4rem" }}>
			<div className="flex justify-between items-center px-6">
				<div className="text-gray-500">© POCKET SOL. All rights reserved.</div>
				<FaGithub className="text-gray-500" size={24} />
			</div>
		</footer>
	);
}
