import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function HomeLayout() {
  return (
    <div className="main-layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
export default HomeLayout;
