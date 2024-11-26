import { RouterProvider } from "react-router-dom";
import router from "./routers/MainRouter";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { AuthProvider } from "./contexts/AuthContext";
import { FixedProvider } from "./contexts/FixedContext";

function App() {
	return (
		<AuthProvider>
			<FixedProvider>
				<RouterProvider router={router} />
			</FixedProvider>
		</AuthProvider>
	);
}

export default App;
