import checkImage from "~/images/check.png";
import { useNavigate } from "react-router-dom";

export default function GroupPurchaseComplete() {
	const navigate = useNavigate();
	return (
		<div className="Container">
			<img
				src={checkImage}
				alt="character"
				loading="lazy"
				style={{ width: 170 }}
			/>
			<p style={{ marginTop: 50 }}>등록이 성공했어요 !</p>

			<div className="button-container">
				<button
					className="complete-button"
					style={{ backgroundColor: "#F3F3F3", color: "black", marginTop: 100 }}
					onClick={() => {
						navigate("/children/group-purchase");
					}}
				>
					확인
				</button>
			</div>
		</div>
	);
}
