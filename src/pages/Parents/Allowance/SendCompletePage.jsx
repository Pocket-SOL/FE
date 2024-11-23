import React from "react";
import checkImage from "~/images/check.png";
export default function SendCompletePage() {
	return (
		<div className="Container">
			<img
				src={checkImage}
				alt="character"
				loading="lazy"
				style={{ width: 170 }}
			/>
			<p style={{ marginTop: 50 }}>용돈 송금 완료</p>
			<div style={{ marginTop: 10 }}>하민지님에게 용돈이 전달되었습니다.</div>
			<div className="button-container">
				<button
					className="complete-button"
					style={{ backgroundColor: "#F3F3F3", color: "black", marginTop: 100 }}
				>
					확인
				</button>
			</div>
		</div>
	);
}
