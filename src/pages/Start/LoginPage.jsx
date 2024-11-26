import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Container, Form, Button } from "react-bootstrap";
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

				const { user_id, id, username, birth, phone, school_auth, role } =
					response.data; // 응답에서 user 정보 추출
				setUser({ user_id, id, username, birth, phone, school_auth, role });

				if (role === "parent") {
					navigate("/parents"); // 부모 페이지로 리디렉션
				} else if (role === "child") {
					navigate("/children"); // 자녀 페이지로 리디렉션
				}

				console.log("로그인 성공!");
			}
		} catch (error) {
			const errorMessage = error.response
				? error.response.data.message
				: "로그인 실패";
			console.error("로그인 실패:", errorMessage);
		}
	};

	return (
		<Container className="d-flex flex-column justify-content-center align-items-center">
			<div className="w-100 text-center mb-4">
				<h1 className="fw-bold">환영합니다! 😍</h1>
				<p>아이디와 비밀번호를 입력해주세요</p>
			</div>

			<Form className="w-100" onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="id">
					<Form.Control
						type="text"
						placeholder="아이디를 입력해주세요"
						value={id}
						onChange={(e) => setId(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="password">
					<Form.Control
						type="password"
						placeholder="비밀번호를 입력해주세요"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Button variant="primary" size="lg" className="w-100" type="submit">
					로그인 하기
				</Button>
			</Form>
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
		</Container>
	);
}
