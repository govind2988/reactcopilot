import { Outlet } from "react-router-dom";
import InfoHeader from "./InfoHeader";
import Footer from "./Footer";

function InfoLayout() {
  return (
    <div className="main-layout">
      <InfoHeader />
      <Outlet />
      <Footer />
    </div>
  );
}
export default InfoLayout;
