import HomeNavbar from "./HomeNavbar"; // Import the HomeNavbar component

const Info = () => {
  return (
    <>
      <HomeNavbar /> {/* Use HomeNavbar in the landing page */}
      <div className="container">
        <h1>Welcome to the Info Page</h1>
        <p>This is the landing page of the application.</p>
      </div>
    </>
  );
};

export default Info;
