import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div style={{ width: 375 }}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
