import FooterHome from "../../common/home/Footer";
import HeaderHome from "../../common/home/Header";

const Home = () => {
  return (
    <>
      <HeaderHome />
      <div className="container">
        <h1>Welcome to the Home Page</h1>
        <p>This is the landing page of the application.</p>
      </div>
      <FooterHome />
    </>
  );
};

export default Home;
