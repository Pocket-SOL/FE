import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const { isAuthenticated, authChecked, login, logout } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const loginData = { id, password };

		try {
			// 로그인 요청, 쿠키에 JWT를 자동으로 저장하려면 withCredentials: true 사용
			const response = await axios.post("api/users/login", loginData, {
				withCredentials: true, // 쿠키를 포함한 요청을 보냄
			});

			if (response.status === 200) {
				login();
				console.log("로그인 성공!");
				console.log(isAuthenticated);
				navigate("/parents");
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
		</Container>
	);
}
