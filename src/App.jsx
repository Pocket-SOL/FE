import { RouterProvider } from "react-router-dom";
import router from "./routers/MainRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { FixedProvider } from "./contexts/FixedContext";
function App() {
	return (
		<AuthProvider>
			<UserProvider>
				<FixedProvider>
					<RouterProvider router={router} />
				</FixedProvider>
			</UserProvider>
		</AuthProvider>
	);
}

export default App;
