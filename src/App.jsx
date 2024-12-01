import { RouterProvider } from "react-router-dom";
import router from "./routers/MainRouter";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { AuthProvider } from "./contexts/AuthContext";
import { FixedProvider } from "./contexts/FixedContext";
import { AllowanceProvider } from "./contexts/AllowanceContext";
import { PurchaseProvider } from "./contexts/PurchaseContext";
// import { WebSocketProvider } from "./contexts/WebSocketContext";

function App() {
	return (
		<AuthProvider>
			<PurchaseProvider>
				<FixedProvider>
					<AllowanceProvider>
						{/* <WebSocketProvider> */}
						<RouterProvider router={router} />
						{/* </WebSocketProvider> */}
					</AllowanceProvider>
				</FixedProvider>
			</PurchaseProvider>
		</AuthProvider>
	);
}

export default App;
