import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000");

export default function NotificationPage() {
	const { user } = useAuth();
	const [notifications, setNotifications] = useState([]);
	const navigate = useNavigate();
	console.log(notifications);
	// 알림 수락
	const handleAcceptAllowance = async (data) => {
		console.log(data);
		socket.emit("acceptAllowance", {
			child_id: data.sender_id,
			parent_id: user.user_id,
			parent: user.username,
			type: data.type,
			message:
				"용돈요청이 허락되었어요😊 조금만 기다려주세요! 곧 용돈이 도착해요.",
		});

		await axios.put(`/api/notifications/${data.notification_id}`);
		await axios.post(`/api/notifications/${user.user_id}`, {
			type: "acceptAllowance",
			isread: false,
			status: "pending",
			content:
				"용돈요청이 허락되었어요😊 조금만 기다려주세요! 곧 용돈이 도착해요.",
			child_id: data.sender_id,
		});

		navigate("/parents/send-allowance", {
			state: { allowanceData: data.amount },
		});
	};

	// 알림 거절
	const handleRejectAllowance = async (data) => {
		const parentMessage = window.prompt("자녀에게 전달할 메세지를 입력하세요.");
		console.log(parentMessage);
		socket.emit("rejectAllowance", {
			child_id: data.sender_id,
			parent_id: user.user_id,
			parent: user.username,
			parentMessage: parentMessage,
			message: "용돈요청이 거절되었어요😭",
			type: "PleaAllowance-reject",
		});

		const response = await axios.post(`/api/notifications/${user.user_id}`, {
			type: "rejectAllowance",
			isread: false,
			status: "pending",
			content: `용돈요청이 거절되었어요😭 \n "${parentMessage}"`,
			child_id: data.sender_id,
		});
		await axios.put(
			`/api/notifications/${response.data.response.notification_id}`,
		);
		await axios.put(`/api/notifications/${data.notification_id}`);
	};

	// 알림 초기 데이터 로드
	useEffect(() => {
		const fetchNoti = async () => {
			const response = await axios.get("/api/notifications");
			setNotifications(
				response.data.response
					.filter(
						(notification) =>
							notification.receiver_id === user.user_id &&
							notification.status !== "done",
					)
					.reverse(),
			);
		};
		fetchNoti();
	}, []);

	return (
		<div className="w-full p-4">
			<h2 className="text-2xl font-bold text-center mb-6">알림 페이지</h2>
			{notifications.length > 0 ? (
				<ul className="space-y-4">
					{notifications.map((notification) => (
						<li
							key={notification.id}
							className={`p-4 border rounded-lg shadow-sm ${
								notification.isread ? "bg-gray-100" : "bg-white"
							}`}
						>
							<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
								<div>
									{/* 알림 내용 */}
									{notification.type === "PleaAllowance" && (
										<>
											<p className="text-lg font-semibold text-gray-700">
												용돈 요청: {notification.content}
											</p>
											<div className="mt-2">
												<button
													className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
													onClick={() => handleAcceptAllowance(notification)}
												>
													승인
												</button>
												<button
													className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition ml-2"
													onClick={() => handleRejectAllowance(notification)}
												>
													거절
												</button>
											</div>
										</>
									)}
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
