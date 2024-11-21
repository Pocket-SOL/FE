import { RouterProvider } from "react-router-dom";
import router from "./routers/MainRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
	return <RouterProvider router={router} />;
}

export default App;
