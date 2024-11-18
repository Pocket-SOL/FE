import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={{ backgroundColor: "lightgrey" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
