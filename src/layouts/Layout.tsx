import netflixCover from "../assets/images/netflix_cover.jpg";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = () => {
  const location = useLocation();
  const isDarkBg = !/^\/(signin|signup)$/.test(location.pathname);

  return (
    <div
      className="min-h-screen flex justify-center flex-col items-center"
      style={{
        backgroundImage: `url(${netflixCover})`,
        backgroundPosition: "right -16.97rem top",
        backgroundSize: "auto 1160px",
        backgroundBlendMode: "color-burn",
        backgroundColor: isDarkBg ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.5)",
      }}
    >
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Layout;
