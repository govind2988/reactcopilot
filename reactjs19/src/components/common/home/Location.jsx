import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import profile from "./../../../assets/profile.png";

const Location = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} className="login-modal">
      <Modal.Header closeButton>
        <Modal.Title>Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="map-container">
          <img src={profile} className="img-fluid w-50" alt="Location" />
        </div>
        <p>
          Location Access Enable location access to help us service your request
          better
        </p>
        <Button variant="primary" onClick={handleClose}>
          Enable Location Access
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default Location;
