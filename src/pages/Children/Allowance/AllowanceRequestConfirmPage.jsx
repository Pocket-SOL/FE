import allowanceRequestIcon from "~/images/allowanceRequestIcon.png";
import { useAllowance } from "../../../contexts/AllowanceContext";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";

export default function AllowanceRequestConfirmPage() {
	const { amount } = useAllowance();
	const { user } = useAuth();

	const handleReq = async () => {
		console.log("현재 amount:", amount);

		try {
			const response = await axios.post(`/api/plea/2`, {
				amount: amount,
			});
			console.log(amount);
			console.log(response);
			// const result = await response.data;
		} catch (error) {
			console.error("댓글 작성 중 오류 발생:", error);
		}
	};
	return (
		<div>
			<div style={{ position: "relative" }}>
				<img
					src={allowanceRequestIcon}
					alt="1"
					loading="lazy"
					style={{
						display: "flex",
						width: "100%",
						flexDirection: "column",
						alignItems: "center",
						padding: 20,
						margin: 0,
						marginTop: 200,
					}}
				/>
				<p
					style={{
						position: "absolute",
						top: "75%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						textAlign: "center",
						// padding: 20,
						fontSize: 18,
					}}
				>
					{user && <span>{user.username}</span>}님에게
					<br /> {amount.toLocaleString()}원을
					<br /> 요청합니다.
				</p>
			</div>
			<button
				className="complete-button"
				style={{
					backgroundColor: "#F3F3F3",
					color: "black",
					marginTop: 150,
				}}
				onClick={handleReq}
			>
				조르기
			</button>
		</div>
	);
}
