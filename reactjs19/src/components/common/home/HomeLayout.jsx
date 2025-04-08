import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function HomeLayout() {
  return (
    <div>
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
export default HomeLayout;
