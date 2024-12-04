// NotificationContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import io from "socket.io-client";

const NotificationContext = createContext();

export function useNotifications() {
	return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
	const [hasNewNotification, setHasNewNotification] = useState(false);
	const { user } = useAuth();
	// WebSocket 연결
	useEffect(() => {
		let socket;
		if (user) {
			socket = io("http://localhost:5000");

			socket.emit("register", user.user_id);

			socket.on("send_RejectNotification", () => {
				setHasNewNotification(true);
			});

			socket.on("send_notification", () => {
				setHasNewNotification(true);
			});

			socket.on("acceptAllowance_Noti", () => {
				setHasNewNotification(true);
			});

			socket.on("askAllowance", () => {
				setHasNewNotification(true);
			});

			socket.on("askAccept", () => {
				setHasNewNotification(true);
			});

			socket.on("newCommentNodification", () => {
				setHasNewNotification(true);
			});

			socket.on("ask-Accept-Allowance", () => {
				setHasNewNotification(true);
			});
		}

		return () => {
			if (socket) {
				socket.off("send_RejectNotification");
				socket.off("send_notification");
				socket.off("acceptAllowance_Noti");
				socket.off("askAllowance");
				socket.off("askAccept");
				socket.off("newCommentNodification");
			}
		};
	}, [user]);

	return (
		<NotificationContext.Provider
			value={{ hasNewNotification, setHasNewNotification }}
		>
			{children}
		</NotificationContext.Provider>
	);
}
