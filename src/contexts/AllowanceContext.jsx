import { Children, createContext, useContext, useState } from "react";

const AllowanceContext = createContext();

export const AllowanceProvider = ({ children }) => {
	const [amount, setAmount] = useState(0);
	return (
		<AllowanceContext.Provider value={{ amount, setAmount }}>
			{children}
		</AllowanceContext.Provider>
	);
};

export function useAllowance() {
	return useContext(AllowanceContext);
}
