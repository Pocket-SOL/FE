import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "~/contexts/AuthContext";

export default function LoginPage() {
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const { login, setUser } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const loginData = { id, password };

		try {
			// 로그인 요청, 쿠키에 JWT를 자동으로 저장
			const response = await axios.post("api/users/login", loginData, {
				withCredentials: true, // 쿠키를 포함한 요청을 보냄
			});

			if (response.status === 200) {
				login();

				const {
					user_id,
					id,
					username,
					birth,
					phone,
					school_auth,
					role,
					school,
					parent_id,
					open_token,
					user_seq_no,
				} = response.data; // 응답에서 user 정보 추출
				setUser({
					user_id,
					id,
					username,
					birth,
					phone,
					school_auth,
					role,
					school,
					parent_id,
					open_token,
					user_seq_no,
				});

				if (role === "parent") {
					navigate("/parents", { replace: true }); // 부모 페이지로 리디렉션
				} else if (role === "child") {
					navigate("/children", { replace: true }); // 자녀 페이지로 리디렉션
				}
				console.log(school);
				console.log("로그인 성공!");
			}
		} catch (error) {
			const errorMessage = error.response
				? error.response.data.message
				: "로그인 실패";
			console.error("로그인 실패:", errorMessage);

			// 로그인 실패 시 경고창을 띄움
			alert(errorMessage);
			console.error("로그인 실패:", errorMessage);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center min-h-screen">
			<div className="w-full text-center mb-4">
				<h1 className="text-3xl font-bold">환영합니다! 😍</h1>
				<p>아이디와 비밀번호를 입력해주세요</p>
			</div>

			<form className="w-full p-6" onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						htmlFor="id"
						className="block text-sm font-medium text-gray-700"
					>
						아이디
					</label>
					<input
						id="id"
						type="text"
						placeholder="아이디를 입력해주세요"
						value={id}
						onChange={(e) => setId(e.target.value)}
						className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="mb-6">
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700"
					>
						비밀번호
					</label>
					<input
						id="password"
						type="password"
						placeholder="비밀번호를 입력해주세요"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<button
					type="submit"
					className="w-full py-3 text-white bg-blue-500 rounded-lg text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					로그인 하기
				</button>
			</form>

			<div>
				<p>
					<a
						style={{ color: "#0084FC", fontSize: "15px" }}
						href="/sign-up-role"
					>
						아이디가 없으신가요?
					</a>
				</p>
			</div>
		</div>
	);
}
