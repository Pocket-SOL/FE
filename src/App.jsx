import { RouterProvider } from "react-router-dom";
import router from "./routers/MainRouter";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { AuthProvider } from "./contexts/AuthContext";
import { FixedProvider } from "./contexts/FixedContext";
import { PurchaseProvider } from "./contexts/PurchaseContext";

function App() {
	return (
		<PurchaseProvider>
			<AuthProvider>
				<FixedProvider>
					<RouterProvider router={router} />
				</FixedProvider>
			</AuthProvider>
		</PurchaseProvider>
	);
}

export default App;
