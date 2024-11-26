import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [authChecked, setAuthChecked] = useState(false); // 인증 여부 확인 완료 상태
	const [user, setUser] = useState(null); // 사용자 정보 (예: userId)

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const response = await axios.get("/api/users/auth", {
					withCredentials: true,
				});
				if (response.status === 200) {
					setIsAuthenticated(true);
					setUser(response.data); // 서버에서 받은 사용자 정보 저장
				}
			} catch (error) {
				console.error("Authentication check failed:", error);
				setIsAuthenticated(false);
				setUser(null);
			} finally {
				setAuthChecked(true); // 반드시 호출
			}
		};
		checkAuthStatus();
	}, []);

	const login = () => {
		setIsAuthenticated(true);
	};

	const logout = () => {
		setIsAuthenticated(false);
		setUser(null); // 사용자 정보 초기화
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, authChecked, user, setUser, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
