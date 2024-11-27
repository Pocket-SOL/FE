import allowanceRequestIcon from "~/images/allowanceRequestIcon.png";
import { useAllowance } from "../../../contexts/AllowanceContext";
import { useAuth } from "../../../contexts/AuthContext";

export default function AllowanceRequestConfirmPage() {
	const { amount } = useAllowance();
	const { user } = useAuth();
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
						top: "75%", // 수직 중앙
						left: "50%", // 수평 중앙
						transform: "translate(-50%, -50%)", // 중앙 정렬을 위한 변환
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
			>
				조르기
			</button>
		</div>
	);
}
