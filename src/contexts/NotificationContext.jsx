import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext();

export function useNotifications() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const { user } = useAuth();
  const timeoutId = useRef(null); // 타이머 ID 관리
  const socketRef = useRef(null); // WebSocket 객체 저장

  useEffect(() => {
    if (user) {
      // WebSocket 연결
      const socket = new WebSocket("ws://pocketsol.shop:5000");

      // WebSocket 객체를 ref에 저장
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("WebSocket 연결 성공");
        // 사용자 정보로 등록 메시지 전송
        socket.send(JSON.stringify({ type: "register", user_id: user.user_id }));
      };

      // 서버에서 오는 메시지 처리
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        handleNotification(message.content);
      };

      socket.onerror = (error) => {
        console.error("WebSocket 오류", error);
      };

      socket.onclose = () => {
        console.log("WebSocket 연결 종료");
      };

      // 클린업
      return () => {
        if (socketRef.current) {
          socketRef.current.close();
        }
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
      };
    }
  }, [user]);

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

  return (
    <NotificationContext.Provider value={{ hasNewNotification, setHasNewNotification }}>
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
