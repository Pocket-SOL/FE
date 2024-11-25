import { createContext, useContext, useState } from "react";

const FixedContext = createContext();

export const FixedProvider = ({ children }) => {
	const [fixedInfoList, setFixedInfoList] = useState([]); // 배열로 초기화

	const addFixedInfo = (newInfo) => {
		setFixedInfoList((prev) => [...prev, newInfo]);
	};

	return (
		<FixedContext.Provider value={{ fixedInfoList, addFixedInfo }}>
			{children}
		</FixedContext.Provider>
	);
};

export const useFixed = () => {
	return useContext(FixedContext);
};
