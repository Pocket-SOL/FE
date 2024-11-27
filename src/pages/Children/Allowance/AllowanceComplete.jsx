import React from "react";
import { useNavigate } from "react-router-dom";
import checkImage from "~/images/check.png";
export default function AllowanceComplete() {
	const navigate = useNavigate();
	return (
		<div className="Container">
			<img
				src={checkImage}
				alt="character"
				loading="lazy"
				style={{ width: 170 }}
			/>
			<p style={{ marginTop: 50 }}>조르기 완료</p>
			<div style={{ marginTop: 10 }}>용돈 조르기 요청이 전달되었습니다.</div>
			<div className="button-container">
				<button
					className="complete-button"
					style={{ backgroundColor: "#F3F3F3", color: "black", marginTop: 100 }}
					onClick={() => {
						navigate("/children");
					}}
				>
					확인
				</button>
			</div>
		</div>
	);
}
