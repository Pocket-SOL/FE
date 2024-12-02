import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
	const { user } = useAuth();
	const socket = useRef(null);

	useEffect(() => {
		// Socket.IO 연결 설정
		socket.current = io("http://localhost:5000"); // 서버 URL

		socket.current.on("connection", () => {
			console.log("Socket.IO connected:", socket.current.id);

			// 사용자 ID를 서버에 전송하여 해당 소켓 ID를 등록
			if (socket.current.id) {
				socket.current.emit("register", socket.current.id);
			}
		});

		socket.current.on("notification", (data) => {
			console.log("Notification received:", data.content); // 알림 내용 출력
			// 부모 컴포넌트로 알림 데이터 전달
		});

		socket.current.on("disconnect", () => {
			console.log("Socket.IO disconnected");
		});

		// 연결 해제 시 소켓 연결 종료
		return () => {
			socket.current.disconnect();
		};
	}, []);

	return (
		<WebSocketContext.Provider value={socket.current}>
			{children}
		</WebSocketContext.Provider>
	);
};
export const useWebSocket = () => useContext(WebSocketContext);
