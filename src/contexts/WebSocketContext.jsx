// import React, { createContext, useContext, useEffect, useRef } from "react";
// import { io } from "socket.io-client";

// const WebSocketContext = createContext(null);

// export const WebSocketProvider = ({ children }) => {
// 	const socket = useRef(null);

// 	useEffect(() => {
// 		// Socket.IO 연결 설정
// 		socket.current = io("http://localhost:5000"); // 서버 URL

// 		socket.current.on("connect", () => {
// 			console.log("Socket.IO connected:", socket.current.id);
// 		});

// 		socket.current.on("notification", (data) => {
// 			console.log("Notification received:", data.message);
// 		});

// 		socket.current.on("disconnect", () => {
// 			console.log("Socket.IO disconnected");
// 		});

// 		return () => {
// 			socket.current.disconnect(); // 연결 해제
// 		};
// 	}, []);

// 	return (
// 		<WebSocketContext.Provider value={socket.current}>
// 			{children}
// 		</WebSocketContext.Provider>
// 	);
// };

// export const useWebSocket = () => useContext(WebSocketContext);
