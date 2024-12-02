// import React from "react";
// import { useWebSocket } from "~/contexts/WebSocketContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../../contexts/AuthContext";

const socket = io("http://localhost:5000");

export default function NotificationPage() {
	// const { notifications } = useWebSocket(); // WebSocketContext에서 알림 리스트를 가져옴
	const { user } = useAuth();
	const [notifications, setNotifications] = useState([]);
	console.log(notifications);
	const handleAccept = async (notification) => {
		const response = await axios.put("/api/childregnotis/registration", {
			sender_id: notification.parent_id, //잘못됨.
			receiver_id: user.user_id, // 선택된 자녀의 ID
		});
		if (response.status === 201) {
			alert("요청이 성공적으로 처리되었습니다!");
			setNotifications(
				(prev) => prev.filter((n) => n !== notification), // 처리한 알림 제거
			);
		}
	};
	const handleReject = () => {
		socket.emit("acceptRegister");
	};
	useEffect(() => {
		//fetch하는 과정이 필요함.
		socket.emit("register", user.user_id);

		socket.on("askAllowance", (data) => {
			setNotifications([...notifications, data]);
		});

		socket.on("askAccept", (data) => {
			setNotifications([...notifications, data]);
		});

		socket.on("newCommentNodification", (data) => {
			setNotifications([...notifications, data]);
		});

		return () => {
			socket.off("newCommentNodification");
		};
	}, [notifications, user.user_id]);

	return (
		<div>
			<h2>알림 페이지</h2>
			{notifications.length > 0 ? (
				<ul>
					{notifications.map((notification, index) => (
						<li key={index}>
							<strong>알림 내용</strong> {notification.content} <br />
							{notification.type === "ask" && (
								<div>
									<strong>자녀 승인:</strong> {notification.message} <br />
									<button onClick={() => handleAccept(notification)}>
										승인
									</button>{" "}
									<button onClick={() => handleReject(notification)}>
										거절
									</button>
									<br />
								</div>
							)}
							{/* <strong>용돈요청:</strong> {notification.AllowanceMessage} <br /> */}
							{/* <strong>받은 사람 ID:</strong> {notification.receiver_id} <br /> */}
							{/* <strong>읽음 상태:</strong>{" "} */}
							{/* {notification.isread ? "읽음" : "읽지 않음"} */}
						</li>
					))}
				</ul>
			) : (
				<p>새로운 알림이 없습니다.</p>
			)}
		</div>
	);
}
