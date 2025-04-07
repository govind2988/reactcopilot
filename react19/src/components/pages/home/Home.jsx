import React from "react";
import HomeNavbar from "./HomeNavbar"; // Import the HomeNavbar component

const Home = () => {
  return (
    <>
      <HomeNavbar /> {/* Use HomeNavbar in the landing page */}
      <div className="container">
        <h1>Welcome to the Home Page</h1>
        <p>This is the landing page of the application.</p>
      </div>
    </>
  );
};

export default Home;
