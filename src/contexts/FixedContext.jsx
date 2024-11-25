import {
	createContext,
	useContext,
	useState,
	useEffect,
	Children,
} from "react";
import axios from "axios";

const FixedContext = createContext();

export const FixedProvider = ({ children }) => {
	const [fixedInfo, setFixedInfo] = useState(null);

	return (
		<FixedContext.Provider value={{ fixedInfo, setFixedInfo }}>
			{children}
		</FixedContext.Provider>
	);
};

export const useFixed = () => {
	return useContext(FixedContext);
};
