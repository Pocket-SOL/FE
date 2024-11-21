import React, { useState } from "react";
import { Card } from "react-bootstrap";
import DateSelection from "./DataSelection";
export default function GroupPurchaseReg() {
	const [head, setHead] = useState(0);
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
						placeholder="제목을 입력해 주세요."
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
						placeholder="가격을 입력해 주세요."
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
				<div>{head}명</div>
				<div>
					<input
						type="range"
						max={10}
						onChange={(e) => {
							const currentValue = e.target.value;
							setHead(currentValue);
						}}
						value={head}
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
					<DateSelection />
				</div>
			</Card.Body>
			<div
				style={{
					paddingBottom: "20px",
					display: "flex",
					justifyContent: "space-between",
				}}
			></div>
			<Card.Body>
				<Card.Title>내용</Card.Title>
				<div>
					<textarea
						placeholder="내용을 입력해 주세요."
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
		</Card>
	);
}
