import React from "react";
import checkImage from "~/images/check.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
export default function SendCompletePage() {
	const navigate = useNavigate();
	const { user, child } = useAuth();

	return (
		<div className="Container">
			<img
				src={checkImage}
				alt="character"
				loading="lazy"
				style={{ width: 170 }}
			/>
			<p style={{ marginTop: 50 }}>용돈 송금 완료</p>
			<div style={{ marginTop: 10 }}>
				{child.name}님에게 용돈이 전달되었습니다.
			</div>
			<div className="button-container">
				<button
					className="complete-button"
					style={{ backgroundColor: "#F3F3F3", color: "black", marginTop: 100 }}
					onClick={() => {
						navigate("/parents");
					}}
				>
					확인
				</button>
			</div>
		</div>
	);
}
