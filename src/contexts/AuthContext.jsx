import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [authChecked, setAuthChecked] = useState(false); // 인증 여부 확인 완료 상태
	const [user, setUser] = useState(null); // 사용자 정보 (예: userId)
	const [child, setChild] = useState(null);
	const [childId, setChildId] = useState(2);
	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const response = await axios.get("/api/users/auth", {
					withCredentials: true,
				});
				if (response.status === 200) {
					setIsAuthenticated(true);
					console.log("auth-response", response);
					setUser(response.data.user); // 서버에서 받은 사용자 정보 저장
				}
			} catch (error) {
				setIsAuthenticated(false);
				setUser(null); // 사용자 정보 초기화
			} finally {
				setAuthChecked(true); // 인증 확인 완료
			}
		};
		checkAuthStatus();
	}, []);

	const login = (userData) => {
		setIsAuthenticated(true);
		setUser(userData); // 로그인 시 전달받은 사용자 정보 설정
	};

	const logout = () => {
		setIsAuthenticated(false);
		setUser(null); // 사용자 정보 초기화
	};

	const fetchChild = async (parentId = 1) => {
		try {
			const response = await axios.get("/api/users/my-children", {
				params: {
					// parent_id: response.data.id,
					parent_id: parentId,
				},
				withCredentials: true,
			});
			if (response.status === 200) {
				setChild(response.data);
			}
		} catch (error) {
			console.error("자녀 정보 불러오기 실패:", error);
		}
	};

	const selectChild = (childId) => {
		setChildId(childId);
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				authChecked,
				user,
				login,
				logout,
				fetchChild,
				child,
				selectChild,
				setChildId,
				childId,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	return useContext(AuthContext);
};
