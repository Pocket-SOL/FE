import { useEffect, useState } from "react";
import { useAuth } from "~/contexts/AuthContext";

export default function NotificationPage() {
	const { authChecked, user } = useAuth();
	const [notificationList, setNotificationList] = useState([]);

	const fetchNotifications = async () => {
		try {
			if (user?.user_id) {
				const response = await fetch(`/api/notifications/${user.user_id}`);
				if (!response.ok) {
					throw new Error("알림 리스트를 가져오는 중 오류가 발생했습니다.");
				}
				const notifications = await response.json();
				console.log(notifications);
				setNotificationList(notifications);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (authChecked && user?.user_id) {
			const loadData = async () => {
				await fetchNotifications();
			};
			loadData();
		}
	}, [user]);

	if (!authChecked || !user) {
		// 인증 확인이 완료되지 않았거나 user 정보가 불러와지지 않은 경우 로딩 표시
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h2 style={{ marginBottom: "20px" }}>알림 페이지</h2>
			{notificationList.length > 0 ? (
				<ul>
					{notificationList.map((notification, index) => (
						<li key={index}>
							<strong>알림 유형:</strong> {notification.type} <br />
							<strong>생성 시간:</strong>{" "}
							{new Date(notification.created_at).toLocaleString()}
						</li>
					))}
				</ul>
			) : (
				<p>알림이 없습니다.</p>
			)}
		</div>
	);
}
