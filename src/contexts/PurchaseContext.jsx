import React, { createContext, useContext, useState } from "react";

// Context 생성
const PurchaseContext = createContext();

// Context Provider 컴포넌트
export function PurchaseProvider({ children }) {
	const [people, setPeople] = useState(0);

	return (
		<PurchaseContext.Provider value={{ people, setPeople }}>
			{children}
		</PurchaseContext.Provider>
	);
}

// Context를 사용하는 커스텀 훅
export function usePurchase() {
	return useContext(PurchaseContext);
}
