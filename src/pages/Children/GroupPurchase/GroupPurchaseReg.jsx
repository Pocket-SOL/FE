import React, { useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import DateSelection from "./DataSelection";
import { useNavigate } from "react-router-dom";
export default function GroupPurchaseReg() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: "",
		amount: "",
		participants: 0,
		end_date: "",
		content: "",
	});
	const [message, setMessage] = useState(""); // 성공/실패 메시지

	// 입력값 변경 처리
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// 모집 인원 슬라이더 변경
	const handleSliderChange = (e) => {
		setFormData({ ...formData, participants: e.target.value });
	};

	const handleChangeDate = (date) => {
		setFormData({ ...formData, end_date: date });
	};

	// 제출 처리
	const handleSubmit = async () => {
		try {
			const response = await axios.post("/api/purchases", formData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`, // 사용자 인증 토큰 포함
				},
			});
			setMessage("등록이 완료되었습니다!");
			console.log("등록 성공:", response.data);
			if (response.data.ok === true) {
				window.alert("등록 성공 하셨습니다.");
				navigate("/GroupPurchaselistpage");
			}
		} catch (error) {
			console.error("등록 실패:", error);
			setMessage("등록에 실패했습니다.");
		}
	};

	console.log(formData);
	return (
		<Card
			style={{
				width: 300,
				borderRadius: "20px",
			}}
		>
			<Card.Body>
				<Card.Title>제목</Card.Title>
				<div>
					<input
						type="text"
						name="title"
						placeholder="제목을 입력해 주세요."
						value={formData.title}
						onChange={handleChange}
						style={{
							width: 260,
							height: 35,
							borderRadius: "5px",
							border: "none",
							backgroundColor: "#F6F6F6",
						}}
					/>
				</div>
			</Card.Body>
			<Card.Body>
				<Card.Title>가격</Card.Title>
				<div>
					<input
						type="text"
						name="amount"
						placeholder="가격을 입력해 주세요."
						value={formData.amount}
						onChange={handleChange}
						style={{
							width: 260,
							height: 35,
							borderRadius: "5px",
							border: "none",
							backgroundColor: "#F6F6F6",
						}}
					/>
				</div>
			</Card.Body>
			<Card.Body>
				<Card.Title>모집 인원</Card.Title>
				<div>{formData.participants}명</div>
				<div>
					<input
						type="range"
						name="participants"
						max={10}
						value={formData.participants}
						onChange={handleSliderChange}
						style={{
							width: 260,
							height: 35,
							borderRadius: "5px",
							border: "none",
						}}
					/>
				</div>
			</Card.Body>
			<Card.Body>
				<Card.Title>마감일</Card.Title>
				<div>
					<DateSelection onChange={handleChangeDate} />
				</div>
			</Card.Body>
			<Card.Body>
				<Card.Title>내용</Card.Title>
				<div>
					<textarea
						name="content"
						placeholder="내용을 입력해 주세요."
						value={formData.content}
						onChange={handleChange}
						style={{
							resize: "none",
							width: 260,
							height: "6em",
							borderRadius: "5px",
							border: "none",
							backgroundColor: "#F6F6F6",
						}}
					/>
				</div>
			</Card.Body>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<button
					onClick={handleSubmit} // 제출 버튼
					style={{
						marginBottom: "16px",
						border: "none",
						width: "5em",
						height: "2.5em",
						borderRadius: "5px",
						backgroundColor: "#0084FC",
						color: "white",
						boxShadow: "3px 3px 3px gray",
					}}
				>
					완료
				</button>
			</div>
			{message && (
				<div style={{ textAlign: "center", color: "green" }}>{message}</div>
			)}
		</Card>
	);
}
