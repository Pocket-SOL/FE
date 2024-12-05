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
  const socketRef = useRef(null); // WebSocket 객체를 저장하기 위한 ref

  useEffect(() => {
    if (!user) return; // user가 없으면 WebSocket 연결을 하지 않음

    // WebSocket 연결
    socketRef.current = new WebSocket("wss://pocketsol.shop:5000");  // WebSocket 연결 (보안 연결)

    // WebSocket 연결 후 사용자 등록
    socketRef.current.onopen = () => {
      console.log("WebSocket 연결 성공");
      socketRef.current.send(JSON.stringify({ type: "register", user_id: user.user_id }));
    };

    // 서버에서 메시지를 받았을 때
    const handleNotification = (message) => {
      setAlertMessage(message);
      setShowAlert(true);
      setHasNewNotification(true);

      // 기존 타이머가 있다면 제거
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      // 2초 후 알림 닫기
      timeoutId.current = setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    };

    // WebSocket 메시지 처리
    socketRef.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        // 알림 종류에 따라 처리
        switch (message.type) {
          case "send_RejectNotification":
            handleNotification("용돈 요청이 거절되었습니다.");
            break;
          case "send_notification":
            handleNotification("새로운 알림이 도착했습니다!");
            break;
          case "acceptAllowance_Noti":
            handleNotification("용돈 요청이 승인되었습니다!");
            break;
          case "askAllowance":
            handleNotification("새로운 용돈 요청이 있습니다.");
            break;
          case "askAccept":
            handleNotification("요청이 수락되었습니다.");
            break;
          case "newCommentNotification":
            handleNotification("새로운 댓글이 달렸습니다!");
            break;
          case "ask-Accept-Allowance":
            handleNotification("용돈 요청이 승인되었습니다!");
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("WebSocket 메시지 처리 오류", error);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket 오류", error);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket 연결 종료");
    };

    // 클린업
    return () => {
      if (socketRef.current) {
        socketRef.current.close(); // WebSocket 연결 종료
      }
      if (timeoutId.current) {
        clearTimeout(timeoutId.current); // 타이머 클리어
      }
    };
  }, [user]);

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
