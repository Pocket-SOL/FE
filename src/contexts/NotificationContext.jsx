import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import io from "socket.io-client";

const NotificationContext = createContext();

export function useNotifications() {
	return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
	const [hasNewNotification, setHasNewNotification] = useState(false);
	const [alertMessage, setAlertMessage] = useState(null);
	const [showAlert, setShowAlert] = useState(false);
	const { user } = useAuth();
	const timeoutId = useRef(null); // useRef로 타이머 ID 관리

	useEffect(() => {
		let socket;
		if (user) {
			socket = io("http://express-app:5000");

			socket.emit("register", user.user_id);

			const handleNotification = (message) => {
				setAlertMessage(message);
				setShowAlert(true);
				setHasNewNotification(true);

				// 기존 타이머가 있다면 제거
				if (timeoutId.current) {
					clearTimeout(timeoutId.current);
				}

				// 5초 후 알림 닫기
				timeoutId.current = setTimeout(() => {
					setShowAlert(false);
				}, 2000);
			};

			// 소켓 이벤트 핸들링
			socket.on("send_RejectNotification", () =>
				handleNotification("용돈 요청이 거절되었습니다."),
			);
			socket.on("send_notification", () =>
				handleNotification("새로운 알림이 도착했습니다!"),
			);
			socket.on("acceptAllowance_Noti", () =>
				handleNotification("용돈 요청이 승인되었습니다!"),
			);
			socket.on("askAllowance", () =>
				handleNotification("새로운 용돈 요청이 있습니다."),
			);
			socket.on("askAccept", () =>
				handleNotification("요청이 수락되었습니다."),
			);
			socket.on("newCommentNodification", () =>
				handleNotification("새로운 댓글이 달렸습니다!"),
			);
			socket.on("ask-Accept-Allowance", () =>
				handleNotification("용돈 요청이 승인되었습니다!"),
			);

			// 클린업
			return () => {
				if (socket) {
					socket.off("send_RejectNotification");
					socket.off("send_notification");
					socket.off("acceptAllowance_Noti");
					socket.off("askAllowance");
					socket.off("askAccept");
					socket.off("newCommentNodification");
				}

				// 타이머 클리어
				if (timeoutId.current) {
					clearTimeout(timeoutId.current);
				}
			};
		}
	}, [user]);

	return (
		<NotificationContext.Provider
			value={{ hasNewNotification, setHasNewNotification }}
		>
			{showAlert && (
				<div
					className="position-absolute alert alert-primary fade show"
					role="alert"
					style={{
						top: "60px", // 헤더 바로 아래
						right: "20px", // 오른쪽 정렬
						zIndex: 1050,
						maxWidth: "300px",
					}}
				>
					{alertMessage}
				</div>
			)}
			{children}
		</NotificationContext.Provider>
	);
}
