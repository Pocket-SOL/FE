import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [userChecked, setUserChecked] = useState(false);

	// 컴포넌트가 마운트될 때마다 유저 정보를 서버에서 가져오기
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get("/api/users/me", {
					withCredentials: true, // 쿠키를 포함한 요청
				});

				if (response.status === 200) {
					setUser(response.data); // 서버에서 받은 유저 정보 저장
				}
			} catch (error) {
				console.error("사용자 정보 불러오기 실패:", error);
			} finally {
				setUserChecked(true);
			}
		};

		fetchUser();
	}, []);

	return (
		<UserContext.Provider value={{ userChecked, user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	return useContext(UserContext);
};
