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

	useEffect(() => {
		//fetch하는 과정이 필요함.
		socket.emit("register", user.user_id);

		socket.on(
			"ask-Accept-Allowance",
			(data) => {
				setNotifications([...notifications, data]);
			},
			[],
		);

		return () => {
			// socket.off("newCommentNodification");
		};
	}, [notifications, user.user_id]);

	return (
		<div>
			<h2>알림 페이지</h2>
			{notifications.length > 0 ? (
				<ul>
					{notifications.map((notification, index) => (
						<li key={index}>
							<strong>용돈요청:</strong> {notification.AllowanceMessage} <br />
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
