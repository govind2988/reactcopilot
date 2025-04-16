import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Login from "./Login"; // Import the Login component

const NavbarHome = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
        <div className="container px-5">
          <a className="navbar-brand" href="/">
            <span className="fw-bolder text-primary">Start Bootstrap</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/info">
                  Info
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/portal">
                  Portal
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={handleShow}>
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Login show={show} handleClose={handleClose} />{" "}
      {/* Use the Login component */}
    </>
  );
};

export default NavbarHome;
