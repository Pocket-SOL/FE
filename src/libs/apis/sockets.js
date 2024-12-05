import { io } from "socket.io-client";

// WebSocket 서버와 연결
const socket = io("http://express-app:5000/api/ws", {
  transports: ["websocket"], // WebSocket만 사용
  reconnection: true,        // 연결 끊김 시 재연결 시도
});

export default socket;
