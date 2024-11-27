import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
	return (
		<div
			style={{
				width: "100vw",
				margin: "0 auto",
			}}
		>
			<Header />
			<main style={{ minHeight: "100vh" }}>
				<Outlet /> {/* 자식 컴포넌트가 이 위치에 렌더링됩니다 */}
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
