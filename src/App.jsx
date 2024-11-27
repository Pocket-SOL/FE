import { RouterProvider } from "react-router-dom";
import router from "./routers/MainRouter";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { AuthProvider } from "./contexts/AuthContext";
import { FixedProvider } from "./contexts/FixedContext";
import { AllowanceProvider } from "./contexts/AllowanceContext";

function App() {
	return (
		<AuthProvider>
			<FixedProvider>
				<AllowanceProvider>
					<RouterProvider router={router} />
				</AllowanceProvider>
			</FixedProvider>
		</AuthProvider>
	);
}

export default App;
