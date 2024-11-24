import { useState } from "react";
import styles from "~/components/SignUpPage.module.css";

export default function SignUpFormPage() {
	const [formData, setFormData] = useState({
		name: "",
		birthdate: "",
		username: "",
		password: "",
		confirmPassword: "",
	});

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
				}),
			});

			const result = await response.json();
			if (response.ok) {
				alert("회원가입이 완료되었습니다!");
				// 성공 시 추가 동작 (예: 페이지 이동)
			} else {
				alert(result.message || "회원가입 중 오류가 발생했습니다.");
			}
		} catch (error) {
			alert("서버와 통신 중 오류가 발생했습니다.");
		}
	};

	return (
		<div className={styles.signUpContainer}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.inputGroup}>
					<label htmlFor="name">이름</label>
					<input
						id="name"
						type="text"
						placeholder="이름을 입력해주세요"
						className={styles.input}
						value={formData.name}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="birthdate">생년월일</label>
					<input
						id="birthdate"
						type="date"
						className={styles.input}
						value={formData.birthdate}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="username">아이디</label>
					<input
						id="username"
						type="text"
						placeholder="아이디를 입력해주세요"
						className={styles.input}
						value={formData.username}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="password">비밀번호</label>
					<input
						id="password"
						type="password"
						placeholder="비밀번호를 입력해주세요"
						className={styles.input}
						value={formData.password}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="confirmPassword">비밀번호 확인</label>
					<input
						id="confirmPassword"
						type="password"
						placeholder="비밀번호를 입력해주세요"
						className={styles.input}
						value={formData.confirmPassword}
						onChange={handleChange}
					/>
				</div>
				<button type="submit" className={styles.submitButton}>
					회원가입
				</button>
			</form>
		</div>
	);
}
