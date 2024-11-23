import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [authChecked, setAuthChecked] = useState(false); // 인증 여부 확인 완료 상태

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const response = await axios.get("/api/users/auth", {
					withCredentials: true,
				});
				if (response.status === 200) {
					setIsAuthenticated(true);
				}
			} catch (error) {
				setIsAuthenticated(false);
			} finally {
				setAuthChecked(true); // 인증 확인 완료
			}
		};
		checkAuthStatus();
	}, []);

	const login = () => {
		setIsAuthenticated(true);
	};

	const logout = () => {
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, authChecked, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	return useContext(AuthContext);
};
