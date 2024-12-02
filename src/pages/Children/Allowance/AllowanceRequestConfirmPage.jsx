import allowanceRequestIcon from "~/images/allowanceRequestIcon.png";
import { useAllowance } from "../../../contexts/AllowanceContext";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchGetUser } from "../../../libs/apis/users";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");
export default function AllowanceRequestConfirmPage() {
	const navigate = useNavigate();
	const { amount } = useAllowance();
	const { user } = useAuth();
	const [userData, setUserData] = useState(null);
	console.log(user);
	// useEffect(() => {
	// 	fetchGetUser();
	// }, []);
	useEffect(() => {
		const getUserData = async () => {
			try {
				const userData = await fetchGetUser(user.parent_id);
				setUserData(userData);
				console.log("유저데이터", userData);
			} catch (error) {
				console.error("사용자 정보 조회 실패:", error);
			}
		};

		getUserData();
	}, []);

	const handleReq = async () => {
		console.log("현재 amount:", amount);

		try {
			const response = await axios.post(`/api/plea/${user.parent_id}`, {
				user_id: user.user_id,
				amount: amount,
			});

			socket.emit("askAllowance", {
				parent_id: user.parent_id,
				child_id: user.user_id,
				message: `자녀 ${user.username}님이 용돈 ${amount}원을 요청했어요!`,
			});

			console.log(amount);
			console.log(response);

			navigate("/children/allowance-complete");
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
					{userData && <span>{userData.username}</span>}님에게
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
