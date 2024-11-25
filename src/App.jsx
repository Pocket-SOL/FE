import { RouterProvider } from "react-router-dom";
import router from "./routers/MainRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";

function App() {
	return (
		<AuthProvider>
			<UserProvider>
				<RouterProvider router={router} />
			</UserProvider>
		</AuthProvider>
	);
}

export default App;
