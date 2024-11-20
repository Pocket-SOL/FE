import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <main style={{ width: "100%", maxWidth: 375, margin: "0 auto" }}>
        <Outlet /> {/* 자식 컴포넌트가 이 위치에 렌더링됩니다 */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
