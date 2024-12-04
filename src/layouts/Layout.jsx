import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
	return (
		<div className="w-full min-w-[360px] mx-auto">
			<Header />
			<main className="min-h-screen flex justify-center">
				<Outlet /> {/* 자식 컴포넌트가 이 위치에 렌더링됩니다 */}
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
