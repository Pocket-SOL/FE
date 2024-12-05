import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../../contexts/AuthContext";

const socket = io("http://localhost:5000");

export default function NotificationPage() {
	const { user } = useAuth();
	const [notifications, setNotifications] = useState([]);

	// 요청 승인
	const handleAccept = async (notification) => {
		console.log(notification);
		const response = await axios.put("/api/childregnotis/registration", {
			sender_id: notification.sender_id,
			receiver_id: user.user_id,
		});
		if (response.status === 201) {
			alert("요청이 성공적으로 처리되었습니다!");
			setNotifications((prev) => prev.filter((n) => n !== notification));
		}
	};

	// 요청 거절
	const handleReject = (notification) => {
		socket.emit("rejectRegister", notification);
		setNotifications((prev) => prev.filter((n) => n !== notification));
	};

	// 읽음 처리
	const handleMarkAsRead = async (notification) => {
		try {
			await axios.put(`/api/notifications/${notification.id}/read`);
			setNotifications((prev) =>
				prev.map((n) =>
					n.id === notification.id ? { ...n, isread: true } : n,
				),
			);
		} catch (error) {
			console.error("읽음 처리 중 오류 발생:", error);
		}
	};

	// 알림 초기 데이터 로드
	useEffect(() => {
		const fetchNoti = async () => {
			const response = await axios.get("/api/notifications");
			setNotifications(response.data.response);
		};
		fetchNoti();
	}, []);

	// 필터링: receiver_id와 status 검사
	const filteredNotifications = notifications
		.filter(
			(notification) =>
				notification.receiver_id === user.user_id &&
				notification.status !== "done",
		)
		.reverse(); // 최신순 정렬

	return (
		<div className="w-full p-4">
			<h2 className="text-2xl font-bold text-center mb-6">알림 페이지</h2>
			{filteredNotifications.length > 0 ? (
				<ul className="space-y-4">
					{filteredNotifications.map((notification) => (
						<li
							key={notification.id}
							className={`p-4 border-b border-gray-300 ${
								notification.isread ? "bg-gray-100" : "bg-white"
							}`}
						>
							<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
								<div>
									{/* <p className="text-sm text-gray-500">
										<span
											className={`${
												notification.isread
													? "text-gray-400"
													: "text-blue-500 font-semibold"
											}`}
										>
											{notification.isread ? "읽음" : "안 읽음"}
										</span>
									</p> */}
								</div>
								<div className="mt-2 sm:mt-0 flex flex-wrap gap-2">
									{/* 각 타입별 알림 내용 */}
									{notification.type === "askChildRegis" && (
										<>
											<strong>자녀 승인 요청</strong> {notification.message}
											<br />
											<button
												className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
												onClick={() => handleAccept(notification)}
											>
												승인
											</button>
											{/* <button
												className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
												onClick={() => handleReject(notification)}
											>
												거절
											</button> */}
										</>
									)}

									{notification.type === "sendAllowance" && (
										<>
											<strong>용돈 발송 완료</strong> {notification.content}
											<br />
											발송 시간{" "}
											{new Date(notification.created_at).toLocaleString(
												"ko-KR",
												{
													year: "numeric",
													month: "2-digit",
													day: "2-digit",
													hour: "2-digit",
													minute: "2-digit",
													hour12: false,
												},
											)}
										</>
									)}
									{notification.type === "PleaAllowance-reject" && (
										<>
											<strong>용돈 요청 거절</strong> {notification.message}
											<br />
											부모님 메시지 {notification.parentMessage}
										</>
									)}
									{notification.type === "COMMENT" && (
										<>
											<strong>댓글 알림</strong> {notification.content}
										</>
									)}

									{notification.type === "acceptAllowance" && (
										<>
											<strong>용돈 요청 승인됨</strong> {notification.content}
										</>
									)}
									{notification.type === "rejectAllowance" && (
										<>
											<strong>요청 거절 알림</strong> {notification.content}
										</>
									)}
									{/* 읽음 버튼 */}
									{/* {notification.isread === false && (
										<button
											className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
											onClick={() => handleMarkAsRead(notification)}
										>
											읽음으로 표시
										</button>
									)} */}
								</div>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p className="text-center text-gray-500">새로운 알림이 없습니다.</p>
			)}
		</div>
	);
}
